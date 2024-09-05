import jwt
from datetime import datetime, timedelta, timezone
from utils.auth import load_private_key

def generate_apple_maps_token():
    team_id = '76P4S4JL68'
    key_id = 'UBA8BYKDU9'
    private_key = load_private_key()

    token = jwt.encode({
        'iss': team_id,
        'iat': datetime.now(timezone.utc),
        'exp': datetime.now(timezone.utc) + timedelta(hours=1)
    }, private_key, algorithm='ES256', headers={'kid': key_id})

    return token