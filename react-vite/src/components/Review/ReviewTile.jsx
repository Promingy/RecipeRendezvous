import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ConfirmDelete from "../ConfirmDelete"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import TextareaAutosize from "react-textarea-autosize"
import { thunkLikeReview, thunkUpdateReview } from "../../redux/review"
import { useNavigate } from "react-router-dom"

export default function ReviewTile({ review }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sessionUser = useSelector(state => state.session.user)
    const [bounceLike, setBounceLike] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [body, setBody] = useState("")
    const [isPrivate, setIsPrivate] = useState(review.private || false)
    const sessionUserName =sessionUser &&
                            sessionUser.first_name[0].toUpperCase() +
                            sessionUser.first_name.slice(1) +
                            " " +
                            sessionUser.last_name[0].toUpperCase() +
                            sessionUser.last_name.slice(1)
    const [closeEditTimeout, setCloseEditTimeout] = useState(null)
    const [submitted, setSubmitted] = useState(false)


    function getHowLongAgo() {
        //Calculates how long ago a review was posted

        // .getTime()/1000 converts the milliseconds into seconds
        // the next /60 converts seconds into minutes
        // the next 60 converts minutes into hours
        // the next 60 converts hours into days
        const postedDate = new Date(review?.created_at)
        const todaysDate = new Date()
        const postedDays = postedDate.getTime()/1000/60/60/24
        const todaysDay = todaysDate.getTime()/1000/60/60/24

        const daysAgo = Math.floor(todaysDay - postedDays)

        let returnTime;

        if (daysAgo < 1) {
            const fullTime = postedDate.toLocaleTimeString()
            const timeNoSeconds = fullTime.slice(0, fullTime.length - 6)
            const amPm = fullTime.slice(fullTime.length - 2)
            returnTime = `Today at  ${timeNoSeconds} ${amPm}`
        }

        else if (daysAgo > 364) {
            const yearsAgo = Math.floor(daysAgo/365)

            returnTime = `${yearsAgo} ${yearsAgo > 1 ? "years ago" : "year ago"}`
        }

        else if (daysAgo > 29) {
            const months = Math.floor(daysAgo / 30)
            returnTime = `${months} ${months > 1 ? "months ago" : "month ago"}`
        }

        else if (daysAgo > 6) {
            const weeks = Math.floor(daysAgo / 7)
            returnTime = `${weeks} ${weeks > 1 ? 'weeks ago' : 'week ago'}`
        }

        else if (daysAgo > 0) {
            returnTime = `${daysAgo} ${daysAgo > 1 ? "days ago" : "day ago"}`
        }

        return returnTime
    }

    function handleReviewUpdate(e) {
        e.preventDefault()

        if (body.length > 2000 || e.key && e.key != 'Enter' || submitted) return

        setSubmitted(true)

        const updatedReview = {
            id: review.id,
            body,
            private: isPrivate,
            edited: true
        }

        dispatch(thunkUpdateReview(updatedReview)).then(() => setSubmitted(false))
        setIsEditing(false)
    }

    function handleReviewLike(e) {
        e.preventDefault()
        // handles both like and delete
        if (submitted) return

        setSubmitted(true)

        const method = review.review_likes[sessionUser.id] ? 'DELETE' : "POST"

        dispatch(thunkLikeReview(review.id, sessionUser, review.recipe_id, method))
        .then(() => setSubmitted(false))
    }

    return (
        <div className="review" onMouseOver={() => setBounceLike(true)} onMouseLeave={() => setBounceLike(false)}>
            <div className="review_poster_container">
                <h3
                    className="review_poster"
                    onClick={() => navigate(`/${review.user_id == sessionUser?.id ? `${sessionUser.id} ${sessionUserName}` : `${review.user_id} ${review.name}`}/recipes`)}>
                        {review.user_id == sessionUser?.id ? sessionUserName  : review.name}
                </h3>
                    <span className="review_posted_date"> {getHowLongAgo()}</span>
            </div>
            <div className="review_body_container">
                {!isEditing &&
                <div className="edited_body">
                    {review.edited && <span className="edited">(edited)</span>}
                    <p className="review_body">{review.body}</p>
                </div>
                }

                {isEditing &&
                    <div className="edit_review_box_container">
                        <div className="edit_review_container">
                            <TextareaAutosize
                            className="edit_review_box"
                                value={body}
                                onChange={e => setBody(e.target.value)}
                                onFocus={() => {
                                    clearTimeout(closeEditTimeout)
                                    setCloseEditTimeout(null)
                                }}
                                onKeyUp={handleReviewUpdate}
                                onBlur={() => {
                                    if (closeEditTimeout) {
                                        clearTimeout(closeEditTimeout)
                                        setCloseEditTimeout(null)
                                    }
                                    setCloseEditTimeout(setTimeout(() => setIsEditing(false), 10000))
                                }}
                            />
                            <span className={body.length >= 1800 ? body.length >= 2000 ? 'at_limit' : 'approaching_limit' : 'within_limit'}>{body.length} / 2000</span>
                        </div>
                        <div className="edit_review_bottom">
                            <div className="edit_private_container">
                                <p className={isPrivate ? 'privacy_unselected' : 'privacy_selected'} onClick={() => setIsPrivate(false)}>Public</p>
                                <p className={isPrivate ? "privacy_selected" : "privacy_unselected"} onClick={() => setIsPrivate(true)}>Private</p>
                            </div>
                            <div>
                                <button className="submit_review submit_updated_review" onClick={handleReviewUpdate}>Submit</button>
                            </div>
                        </div>
                    </div>
                }

                { review.user_id == sessionUser?.id &&
                    <div className="review_owner_icons">
                        <span onClick={() => {
                            setBody(review.body)
                            setIsPrivate(review.private)
                            setIsEditing(!isEditing)
                            }}>
                            <i className={`fa-regular fa-${isEditing ? 'x' : 'pen-to-square'} fa-lg`} />
                        </span>
                        <span className="delete_review_modal">
                            <OpenModalButton
                            buttonText={<span className="fa-regular fa-trash-can fa-xl"/>}
                            modalComponent={<ConfirmDelete review={review} />}
                            />
                        </span>
                    </div>
                }
            </div>
            <div className="is_this_helpful_container" onClick={handleReviewLike}>
                <span className="is_this_helpful_text">Is this helpful?</span>
                <i className={`fa-regular fa-thumbs-up ${bounceLike && 'fa-bounce'} ${review.review_likes?.[sessionUser?.id] ? 'liked_review' : ""}`}/>
                {Object.values(review.review_likes).length}
            </div>
        </div>
    )
}
