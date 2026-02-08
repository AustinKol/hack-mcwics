from pymongo import MongoClient
from bson import ObjectId
import re

client = MongoClient('mongodb+srv://admin:JhrNWVDCIUjsOi3w@dev.skvdld3.mongodb.net/?appName=dev')
db = client['mcwics-portal']

# Find CSUS club
csus = db.clubs.find_one({'name': re.compile('Computer Science', re.IGNORECASE)})
if csus:
    print(f'CSUS ID: {csus["_id"]}')
    club_id = csus['_id']
    
    # Find open roles for CSUS
    roles = list(db.openroles.find({'club': club_id}))
    role_ids = [r['_id'] for r in roles]
    print(f'Open roles: {[r.get("jobTitle", r.get("title")) for r in roles]}')
    print(f'Role IDs: {role_ids}')
    
    # Find applications for these roles - exactly as get_mongo_context does
    role_id_strs = [str(r) for r in role_ids]
    club_ids = [str(club_id)]
    club_names = [csus.get('name')]
    
    applications_raw = list(db.applications.find({
        '$or': [
            {'openRole': {'$in': role_ids}},
            {'openRole': {'$in': role_id_strs}},
            {'roleId': {'$in': role_id_strs}},
            {'clubId': {'$in': club_ids}},
            {'club': {'$in': club_names}}
        ]
    }).limit(100))
    
    print(f'\\nApplications found: {len(applications_raw)}')
    for app in applications_raw:
        applicant_id = app.get('applicant')
        if applicant_id:
            try:
                applicant_oid = ObjectId(applicant_id) if isinstance(applicant_id, str) else applicant_id
                applicant = db.users.find_one({'_id': applicant_oid})
                if applicant:
                    print(f'  App ID: {app["_id"]}, Name: {applicant.get("name")}, Status: {app.get("status")}')
            except Exception as e:
                print(f'  Error: {e}')

