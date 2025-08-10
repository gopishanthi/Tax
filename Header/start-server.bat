@echo off
echo Starting local server for India Post Portal...
echo.
echo This will start a local server at http://localhost:8000
echo Open your browser and go to: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try Python 3 first
python -m http.server 8000 2>nul
if errorlevel 1 (
    REM Try Python 2
    python -m SimpleHTTPServer 8000 2>nul
    if errorlevel 1 (
        echo Python not found. Trying Node.js...
        npx serve . -p 8000 2>nul
        if errorlevel 1 (
            echo Neither Python nor Node.js found.
            echo Please install Python or Node.js to run a local server.
            pause
        )
    )
) 