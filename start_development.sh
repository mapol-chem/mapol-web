#!/bin/bash

echo "🚀 Starting MAPOL Web Development Environment"
echo "============================================="

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Clean up existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "python.*app.py" 2>/dev/null || true
pkill -f "vite\|npm.*start" 2>/dev/null || true
sleep 2

# Start the Flask API server
echo "🐍 Starting Flask API server..."
cd API && python app.py &
API_PID=$!
cd ..
sleep 3

# Check if API started successfully
if check_port 5000; then
    echo "✅ API server started on http://127.0.0.1:5000"
else
    echo "❌ Failed to start API server"
    kill $API_PID 2>/dev/null || true
    exit 1
fi

# Start the React development server
echo "⚛️  Starting React development server..."
cd frontend && npm start &
REACT_PID=$!
cd ..
sleep 5

# Check if React server started
if check_port 5173 || check_port 3000; then
    echo "✅ React development server started"
    echo ""
    echo "🌐 Open your browser: http://localhost:5173"
    echo "📝 Click 'Notebooks' to test the functionality"
    echo ""
    echo "🛑 Press Ctrl+C to stop both servers"
    
    # Wait for interrupt
    trap 'echo "🛑 Stopping servers..."; kill $API_PID $REACT_PID 2>/dev/null || true; exit 0' INT
    
    # Keep script running
    while true; do sleep 1; done
else
    echo "❌ Failed to start React server"
    kill $API_PID $REACT_PID 2>/dev/null || true
    exit 1
fi
