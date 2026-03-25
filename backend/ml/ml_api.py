from flask import Flask, jsonify
from flask_cors import CORS
from ai_analysis import get_analysis

app = Flask(__name__)
CORS(app)

@app.route('/predict-expense', methods=['GET'])
def predict():
    return jsonify({
        "status": "success",
        "predicted_expense": 20500.0
    })

@app.route('/ai-analysis', methods=['GET'])
def ai_analysis():
    result = get_analysis()
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)