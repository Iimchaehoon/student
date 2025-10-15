from flask import Flask, request, jsonify
import os

app = Flask(__name__)

def anonymize(input_payload: dict) -> dict:
    # Replace identifiable keys with tokenized IDs; keep only coarse features
    return {
        "student_token": input_payload.get("student_token", "anon"),
        "grades": input_payload.get("grades", {}),
        "attendance": input_payload.get("attendance", {}),
        "habits": input_payload.get("habits", {}),
        "activities": input_payload.get("activities", {}),
        "counseling_keywords": input_payload.get("counseling_keywords", []),
    }

@app.get('/health')
def health():
    return jsonify({"ok": True})

@app.post('/recommendations')
def recommendations():
    payload = request.get_json(force=True, silent=True) or {}
    data = anonymize(payload)
    # Stub hybrid rules: respond with a friendly suggestion
    suggestion = {
        "category": "Study",
        "message": "Your math score has improved. Keep focusing on problem-solving exercises.",
    }
    return jsonify({"input": data, "suggestions": [suggestion]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', '5000')))

