from flask import Flask, request, jsonify
import os
import json
import tempfile
import nbformat
import glob
from nbconvert.preprocessors import ExecutePreprocessor
from flask_cors import CORS

app = Flask(__name__)
CORS(app, 
     origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"], 
     allow_headers=["Content-Type", "Authorization"], 
     methods=["GET", "POST", "OPTIONS"])

notebook_path = os.path.join(os.path.dirname(__file__), 'Notebooks')
@app.route('/')
def home():
    return "Hello world, from flask"

@app.route('/api/list-notebooks', methods=['GET'])
def list_notebooks():
    """Get list of all available notebooks"""
    files = glob.glob(os.path.join(notebook_path, '*.ipynb'))
    notebook_names = [os.path.basename(f) for f in files]
    return jsonify({"notebooks": notebook_names})

@app.route('/api/get-notebook-content', methods=['POST'])
def get_notebook_content():
    """Get all code blocks from a specific notebook"""
    try:
        data = request.get_json()
        notebook_name = data.get('notebook')
        
        if not notebook_name:
            return jsonify({"error": "No notebook specified"}), 400
            
        full_path = os.path.join(notebook_path, notebook_name)
        
        if not os.path.isfile(full_path):
            return jsonify({"error": "Notebook not found"}), 404
            
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check if it's a proper JSON notebook
        try:
            notebook = json.loads(content)
            if 'cells' not in notebook:
                return jsonify({"error": "Invalid notebook format - no cells found"}), 400
        except json.JSONDecodeError:
            # If it's not JSON, it might be in VS Code XML format
            return jsonify({"error": "Notebook appears to be in VS Code format. Please use a standard Jupyter notebook (.ipynb) file."}), 400
            
        code_blocks = []
        for idx, cell in enumerate(notebook['cells']):
            if cell.get('cell_type') == 'code':
                # Handle both string and list formats for source
                source = cell.get('source', [])
                if isinstance(source, list):
                    code = "".join(source)
                else:
                    code = str(source)
                    
                code_blocks.append({
                    "id": idx,
                    "code": code,
                    "original_code": code
                })
                
        return jsonify({"codeBlocks": code_blocks})
        
    except Exception as e:
        return jsonify({"error": f"Error processing notebook: {str(e)}"}), 500

@app.route('/api/execute-code', methods=['POST'])
def execute_code():
    """Execute Python code and return output including images"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        
        if not code.strip():
            return jsonify({"text_output": "No code to execute"})
            
        # Add matplotlib backend configuration for better image handling
        setup_code = """
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
plt.ioff()  # Turn off interactive mode
"""
        
        # Combine setup code with user code
        full_code = setup_code + "\n" + code
            
        # Create a temporary notebook with the provided code
        nb = nbformat.v4.new_notebook()
        nb.cells = [nbformat.v4.new_code_cell(full_code)]
        
        with tempfile.NamedTemporaryFile(suffix=".ipynb", delete=False, mode='w') as tmp_nb:
            nbformat.write(nb, tmp_nb.name)
            
        # Execute the notebook
        ep = ExecutePreprocessor(timeout=60)
        
        try:
            with open(tmp_nb.name, 'r') as f:
                nb_to_run = nbformat.read(f, as_version=4)
                
            ep.preprocess(nb_to_run, {'metadata': {'path': notebook_path}})
            
            # Collect all outputs
            outputs = nb_to_run.cells[0].get('outputs', [])
            result = {
                "text_output": "",
                "images": [],
                "html_output": "",
                "error": None
            }
            
            for output in outputs:
                if output.output_type == 'stream':
                    result["text_output"] += output.text
                elif output.output_type == 'execute_result':
                    data_content = output.get('data', {})
                    
                    # Handle text output
                    if 'text/plain' in data_content:
                        result["text_output"] += str(data_content['text/plain'])
                    
                    # Handle HTML output
                    if 'text/html' in data_content:
                        result["html_output"] += str(data_content['text/html'])
                    
                    # Handle images
                    if 'image/png' in data_content:
                        result["images"].append({
                            "type": "png",
                            "data": data_content['image/png']
                        })
                    
                elif output.output_type == 'display_data':
                    data_content = output.get('data', {})
                    
                    # Handle images from display_data
                    if 'image/png' in data_content:
                        result["images"].append({
                            "type": "png", 
                            "data": data_content['image/png']
                        })
                    
                    # Handle HTML from display_data
                    if 'text/html' in data_content:
                        result["html_output"] += str(data_content['text/html'])
                        
                elif output.output_type == 'error':
                    result["error"] = '\n'.join(output['traceback'])
                    
            return jsonify(result)
            
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        finally:
            # Clean up temporary file
            try:
                os.unlink(tmp_nb.name)
            except OSError:
                pass  # File already deleted or doesn't exist
                
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "mapol-jupyter-api"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)