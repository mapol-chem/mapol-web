from flask import Flask, request, jsonify, session
import os
import json
import tempfile
import nbformat
import glob
import uuid
from nbconvert.preprocessors import ExecutePreprocessor
from flask_cors import CORS
import threading

app = Flask(__name__)
app.secret_key = 'mapol-jupyter-session-key-2024'
CORS(app, 
     origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"], 
     allow_headers=["Content-Type", "Authorization"], 
     methods=["GET", "POST", "OPTIONS"],
     supports_credentials=True)

notebook_path = os.path.join(os.path.dirname(__file__), 'Notebooks')

# Global dictionary to store execution sessions
execution_sessions = {}
session_lock = threading.Lock()

def get_or_create_session():
    """Get or create a persistent execution session"""
    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())
    
    session_id = session['session_id']
    
    with session_lock:
        if session_id not in execution_sessions:
            # Create a new notebook for this session
            nb = nbformat.v4.new_notebook()
            # Add initial setup cell
            setup_code = """
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
plt.ioff()  # Turn off interactive mode
import base64
from io import BytesIO

# Function to capture and encode plots
def _capture_matplotlib_plots():
    figures = []
    for fig_num in plt.get_fignums():
        fig = plt.figure(fig_num)
        buf = BytesIO()
        fig.savefig(buf, format='png', bbox_inches='tight', dpi=150)
        buf.seek(0)
        img_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        figures.append(img_base64)
        buf.close()
    plt.close('all')  # Close all figures after capturing
    return figures
"""
            setup_cell = nbformat.v4.new_code_cell(setup_code)
            nb.cells.append(setup_cell)
            
            execution_sessions[session_id] = {
                'notebook': nb,
                'execution_count': 1
            }
    
    return session_id

@app.route('/api/reset-session', methods=['POST'])
def reset_session():
    """Reset the current execution session"""
    if 'session_id' in session:
        session_id = session['session_id']
        with session_lock:
            if session_id in execution_sessions:
                del execution_sessions[session_id]
    
    # Create new session
    get_or_create_session()
    return jsonify({"status": "session reset"})
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
            
        code_blocks = []
        
        # Check if it's a proper JSON notebook
        try:
            notebook = json.loads(content)
            if 'cells' not in notebook:
                return jsonify({"error": "Invalid notebook format - no cells found"}), 400
                
            # Parse standard Jupyter notebook format
            for idx, cell in enumerate(notebook['cells']):
                if cell.get('cell_type') == 'code':
                    # Handle both string and list formats for source
                    source = cell.get('source', [])
                    if isinstance(source, list):
                        code = "".join(source)
                    else:
                        code = str(source)
                    
                    # Clean up ANSI color codes and formatting artifacts
                    import re
                    
                    # Remove actual ANSI escape sequences (binary)
                    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
                    code = ansi_escape.sub('', code)
                    
                    # Remove Unicode escape sequences like \u001b[38;5;28m
                    unicode_escape = re.compile(r'\\u001b\[[0-9;]*[mK]')
                    code = unicode_escape.sub('', code)
                    
                    # Remove other color code patterns
                    color_codes = re.compile(r'\\[0-9;]*[mK]')
                    code = color_codes.sub('', code)
                    
                    # Remove line number prefixes and execution indicators
                    line_number_pattern = re.compile(r'^\s*\d+\s+', re.MULTILINE)
                    code = line_number_pattern.sub('', code)
                    
                    # Remove execution arrows and traceback indicators
                    code = re.sub(r'---> \d+', '', code)
                    code = re.sub(r'\(\.\.\.\)', '', code)
                    code = re.sub(r'Cell.*?line \d+', '', code)
                    
                    # Remove any remaining escape sequences
                    code = re.sub(r'\\u[0-9a-fA-F]{4}', '', code)
                    
                    # Clean up extra whitespace
                    code = re.sub(r'\n\s*\n\s*\n', '\n\n', code)
                    code = code.strip()
                        
                    code_blocks.append({
                        "id": f"cell_{idx}",
                        "code": code,
                        "original_code": code
                    })
                    
        except json.JSONDecodeError:
            # Try to parse VS Code XML format
            import re
            
            # Find all VSCode.Cell blocks
            cell_pattern = r'<VSCode\.Cell\s+id="([^"]*?)"\s+language="([^"]*?)"[^>]*?>(.*?)</VSCode\.Cell>'
            cells = re.findall(cell_pattern, content, re.DOTALL)
            
            for idx, (cell_id, language, cell_content) in enumerate(cells):
                if language == 'python':
                    # Clean up the content - remove extra whitespace but preserve code structure
                    code = cell_content.strip()
                    
                    # Remove ANSI color codes and escape sequences
                    import re
                    
                    # Remove actual ANSI escape sequences (binary)
                    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
                    code = ansi_escape.sub('', code)
                    
                    # Remove Unicode escape sequences like \u001b[38;5;28m
                    unicode_escape = re.compile(r'\\u001b\[[0-9;]*[mK]')
                    code = unicode_escape.sub('', code)
                    
                    # Remove other color code patterns
                    color_codes = re.compile(r'\\[0-9;]*[mK]')
                    code = color_codes.sub('', code)
                    
                    # Remove line number prefixes and execution indicators
                    line_number_pattern = re.compile(r'^\s*\d+\s+', re.MULTILINE)
                    code = line_number_pattern.sub('', code)
                    
                    # Remove execution arrows and traceback indicators
                    code = re.sub(r'---> \d+', '', code)
                    code = re.sub(r'\(\.\.\.\)', '', code)
                    code = re.sub(r'Cell.*?line \d+', '', code)
                    
                    # Remove any remaining escape sequences
                    code = re.sub(r'\\u[0-9a-fA-F]{4}', '', code)
                    
                    # Clean up extra whitespace
                    code = re.sub(r'\n\s*\n\s*\n', '\n\n', code)  # Reduce multiple blank lines
                    code = code.strip()
                    
                    # Use a clean ID without the #VSC- prefix for frontend display
                    clean_id = f"cell_{idx + 1}"
                    
                    code_blocks.append({
                        "id": clean_id,
                        "code": code,
                        "original_code": code,
                        "vs_code_id": cell_id  # Keep original ID for VS Code operations
                    })
                    
        return jsonify({"codeBlocks": code_blocks})
        
    except Exception as e:
        return jsonify({"error": f"Error processing notebook: {str(e)}"}), 500

@app.route('/api/execute-code', methods=['POST'])
def execute_code():
    """Execute Python code in a persistent session and return output including images"""
    try:
        data = request.get_json()
        code = data.get('code', '')
        
        if not code.strip():
            return jsonify({"text_output": "No code to execute"})
        
        # Get or create session
        session_id = get_or_create_session()
        
        with session_lock:
            session_data = execution_sessions[session_id]
            nb = session_data['notebook']
            execution_count = session_data['execution_count']
            
            # Add the user's code with plot capture
            enhanced_code = f"""
# User code execution {execution_count}
{code}

# Capture any matplotlib plots
_plot_images = _capture_matplotlib_plots()
"""
            
            # Create new code cell
            new_cell = nbformat.v4.new_code_cell(enhanced_code)
            new_cell.execution_count = execution_count
            nb.cells.append(new_cell)
            
            # Write notebook to temporary file
            with tempfile.NamedTemporaryFile(suffix=".ipynb", delete=False, mode='w') as tmp_nb:
                nbformat.write(nb, tmp_nb.name)
                tmp_file_path = tmp_nb.name
        
        # Execute the notebook
        ep = ExecutePreprocessor(timeout=60, kernel_name='python3')
        
        try:
            with open(tmp_file_path, 'r') as f:
                nb_to_run = nbformat.read(f, as_version=4)
                
            ep.preprocess(nb_to_run, {'metadata': {'path': notebook_path}})
            
            # Get outputs from the last cell (user's code)
            last_cell = nb_to_run.cells[-1]
            outputs = last_cell.get('outputs', [])
            
            result = {
                "text_output": "",
                "images": [],
                "html_output": "",
                "error": None
            }
            
            # Process outputs
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
            
            # Check for captured matplotlib plots in the notebook's namespace
            # Look for _plot_images variable in the last executed cell
            try:
                # Execute a small snippet to get the _plot_images variable
                check_plots_cell = nbformat.v4.new_code_cell("_plot_images if '_plot_images' in locals() else []")
                nb_to_run.cells.append(check_plots_cell)
                
                ep.preprocess(nb_to_run, {'metadata': {'path': notebook_path}})
                
                plot_outputs = nb_to_run.cells[-1].get('outputs', [])
                for output in plot_outputs:
                    if output.output_type == 'execute_result':
                        data_content = output.get('data', {})
                        if 'text/plain' in data_content:
                            # Parse the list of base64 images
                            plot_data = eval(data_content['text/plain'])
                            if isinstance(plot_data, list):
                                for img_data in plot_data:
                                    if img_data:  # Only add non-empty images
                                        result["images"].append({
                                            "type": "png",
                                            "data": img_data
                                        })
            except:
                pass  # If plot capture fails, continue without plots
            
            # Update session with the executed notebook
            with session_lock:
                execution_sessions[session_id]['notebook'] = nb_to_run
                execution_sessions[session_id]['execution_count'] += 1
            
            # Clean text output to remove any HTML contamination
            import re
            if result["text_output"]:
                # Remove HTML tags and attributes that might contaminate output
                cleaned_text = result["text_output"]
                # Remove span tags with class attributes
                cleaned_text = re.sub(r'<span[^>]*class="[^"]*"[^>]*>', '', cleaned_text)
                cleaned_text = re.sub(r'</span>', '', cleaned_text)
                # Remove any remaining HTML tags
                cleaned_text = re.sub(r'<[^>]*>', '', cleaned_text)
                # Remove style attributes
                cleaned_text = re.sub(r'style="[^"]*"', '', cleaned_text)
                # Remove class attributes
                cleaned_text = re.sub(r'class="[^"]*"', '', cleaned_text)
                result["text_output"] = cleaned_text
                
            return jsonify(result)
            
        except Exception as e:
            with session_lock:
                execution_sessions[session_id]['execution_count'] += 1
            return jsonify({"error": str(e)}), 400
        finally:
            # Clean up temporary file
            try:
                os.unlink(tmp_file_path)
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