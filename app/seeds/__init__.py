from flask.cli import AppGroup
from .users import seed_users, undo_users
from .recipes import seed_recipes, undo_recipes
from .categories import seed_categories, unseed_categories
from .reviews import seed_reviews, undo_reviews
from .measurements import seed_measurements, undo_measurements
from .quantities import seed_quantities, undo_quantities
from .steps import seed_steps, undo_steps
from .ratings import seed_ratings, undo_ratings

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_ratings()
        undo_reviews()
        undo_recipes()
        undo_steps()
        undo_quantities()
        undo_measurements()
        unseed_categories()
        undo_users()
    seed_users()
    seed_categories()
    seed_measurements()
    seed_recipes()
    seed_quantities()
    seed_steps()
    seed_reviews()
    seed_ratings()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_ratings()
    undo_reviews()
    undo_recipes()
    undo_steps()
    undo_quantities()
    undo_measurements()
    unseed_categories()
    undo_users()
    # Add other undo functions here
