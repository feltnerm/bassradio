# Global Settings
#########
PRODUCTION = {{ PRODUCTION }}
DEVELOPMENT = not PRODUCTION

DEBUG = not PRODUCTION
TESTING = DEBUG
ASSETS_DEBUG = DEBUG
SECRET_KEY = """{{ SECRET_KEY }}"""

# Music Database
#########
SQLALCHEMY_DATABASE_URI = "sqlite:///%s" % """{{ MUSIC_DATABASE }} """

# Cache
#########
CACHE_TYPE = 'null'
CACHE_DEFAULT_TIMEOUT = 300
#CACHE_TYPE = 'memcached'
#CACHE_MEMCACHED_SERVERS = [os.environ.get('MEMCACHE_USERNAME')+':'+os.environ.get('MEMCACHE_PASSWORD')+'@'+os.environ.get('MEMCACHE_SERVERS'),]
