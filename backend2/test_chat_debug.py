import requests
import json
import time

url = "http://localhost:5001/chat"
payload = {
    "message": "show me applications to my club",
    "user_email": "vpinternal.csus@mcgill.ca",
    "session_id": "test_session_debug_1"
}

print(f"Sending request to {url}...")
try:
    response = requests.post(url, json=payload, timeout=30)
    print(f"Status: {response.status_code}")
    print("Response JSON:")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
