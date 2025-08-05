import os
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "minecraft-bedwars-secret-key")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Configure the database
database_url = os.environ.get("DATABASE_URL", "sqlite:///bedwars_leaderboard.db")
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Custom Jinja2 filters
@app.template_filter('unique')
def unique_filter(lst):
    """Remove duplicates from list while preserving order"""
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

@app.template_filter('hex_to_rgb')
def hex_to_rgb_filter(hex_color):
    """Convert hex color to RGB values"""
    if not hex_color or not hex_color.startswith('#'):
        return "0, 0, 0"

    hex_color = hex_color.lstrip('#')
    if len(hex_color) != 6:
        return "0, 0, 0"

    try:
        r = int(hex_color[0:2], 16)
        g = int(hex_color[2:4], 16)
        b = int(hex_color[4:6], 16)
        return f"{r}, {g}, {b}"
    except ValueError:
        return "0, 0, 0"

# Initialize the app with the extension
db.init_app(app)

# Import routes first
import routes

with app.app_context():
    # Import models to ensure tables are created
    from models import Player, Quest, PlayerQuest, Achievement, PlayerAchievement, CustomTitle, PlayerTitle, GradientTheme, PlayerGradientSetting, SiteTheme, ShopItem, ShopPurchase, CursorTheme, Clan, ClanMember, Tournament, TournamentParticipant, PlayerActiveBooster

    try:
        # Create all tables
        db.create_all()

        # Initialize default data
        Quest.create_default_quests()
        Achievement.create_default_achievements()
        SiteTheme.create_default_themes()
        CustomTitle.create_default_titles()
        GradientTheme.create_default_themes()
        CursorTheme.create_default_cursors()
        ShopItem.create_default_items()

        # Log initialization
        app.logger.info("Database and default data initialized successfully")
    except Exception as e:
        app.logger.error(f"Error initializing database: {e}")
        # If there's an error, try to recreate tables
        try:
            db.drop_all()
            db.create_all()
            app.logger.info("Database recreated successfully")
        except Exception as recreate_error:
            app.logger.error(f"Error recreating database: {recreate_error}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)