from flask import Blueprint, session, request
from ..models import Review, Like, db
from ..forms import ReviewForm
from flask_login import login_required, current_user

review = Blueprint('reviews', __name__)

@review.route('/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(reviewId):

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    review = Review.query.get(reviewId)

    if not review:
        return {"errors": "review not found"}, 404

    if form.validate_on_submit():
        data = form.data
        review.body = data['body']
        review.edited = True
        review.private = data['private']

        db.session.commit()

        return review.to_dict()

    else:
        return {"errors": form.data}, 400

@review.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):

    review = Review.query.get(reviewId)

    if not review:
        return {"errors": "review not found"}, 404

    if int(review.to_dict()['user_id']) == int(session['_user_id']):
        db.session.delete(review)
        db.session.commit()

        return {"message": "success"}

@review.route('/<int:reviewId>/likes', methods=['POST', 'DELETE'])
@login_required
def like_review(reviewId):
    review = Review.query.get(reviewId)

    like = [like for like in review.review_likes if like.id == int(session['_user_id'])]

    if len(like) > 0:
        review.review_likes.remove(like[0])
        db.session.commit()
        return {"message": "successfully deleted"}

    review.review_likes.append(current_user)

    db.session.commit()

    return {'message': 'operation successful'}
