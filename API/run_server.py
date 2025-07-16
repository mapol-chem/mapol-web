#!/usr/bin/env python3

import sys
import os
import threading
import time

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app

def run_api_server():
    """Run the Flask API server"""
    print("🚀 Starting MAPOL Jupyter Notebook API server...")
    print("   API URL: http://127.0.0.1:5000")
    print("   Available endpoints:")
    print("   - GET  /api/list-notebooks")
    print("   - POST /api/get-notebook-content")
    print("   - POST /api/execute-code")
    print("   - GET  /metrics")
    print("   - GET  /health")
    print("")
    
    # Run the Flask app
    app.run(host='127.0.0.1', port=5000, debug=False, use_reloader=False)

def test_api_first():
    """Test the API before starting the server"""
    print("🧪 Testing API functionality first...")
    
    with app.test_client() as client:
        # Quick test
        response = client.get('/api/list-notebooks')
        if response.status_code == 200:
            data = response.get_json()
            notebooks = data.get('notebooks', [])
            print(f"✅ API Test: Found {len(notebooks)} notebooks")
            return True
        else:
            print(f"❌ API Test Failed: {response.status_code}")
            return False

if __name__ == '__main__':
    print("=" * 60)
    print("MAPOL Jupyter Notebook API Server")
    print("=" * 60)
    
    # Test API first
    if test_api_first():
        print("✅ API tests passed. Starting server...")
        print("\n💡 To test the frontend:")
        print("   1. Open another terminal")
        print("   2. cd /Users/warw272/Projects/mapol-web")
        print("   3. npm start")
        print("   4. Navigate to http://localhost:3000")
        print("   5. Click on 'Notebooks' tab")
        print("\n🛑 Press Ctrl+C to stop the server")
        print("-" * 60)
        
        try:
            run_api_server()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
    else:
        print("❌ API tests failed. Please check the implementation.")
        sys.exit(1)
