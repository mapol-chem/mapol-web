from flask import Flask, request, jsonify
import json 
import subprocess
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
@app.route('/')
def home():
    return "Hello world, from flask"

@app.route('/api/get-python-snippets', methods=['GET'])
def get_python_snippets(): 
    # Simulate a user database
    try:
        with open('example_notebook.ipynb', 'r') as f:
            notebook = json.load(f)
            
        code_blocks = [
            {"id": idx, "code": "".join(cell['source'])}
            for idx, cell in enumerate(notebook['cells'])
            if cell['cell_type'] == 'code'
        ]
        
        return jsonify({"codeBlocks": code_blocks})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/execute-python', methods=['POST'])
def execute_python():
    try:
        
        data = request.get_json()
        code = data.get('code', '')
        
        result = subprocess.run(
            ['python3', '-c', code],
            capture_output=True,
            text=True,
            check=True
        )
        
        return jsonify({"output": result.stdout})
    except subprocess.CalledProcessError as e:
        return jsonify({"output": e.stderr}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
   

if __name__ == '__main__':
    app.run(debug=True, port=5000)
# To run the application, use the command:
# python app.py