# Andrea Portfolio — Static Render Version

This version does not use Flask, Gunicorn, app.py, requirements.txt or a Procfile.

## Test locally
Open `index.html` directly in your browser, or run a simple local server:

    python -m http.server 8000

Then visit:

    http://127.0.0.1:8000

## Deploy on Render
1. Upload the contents of this folder to your GitHub repository.
2. In Render, choose **New > Static Site**.
3. Connect the GitHub repository.
4. Build Command: leave blank.
5. Publish Directory: `.`
6. Deploy.

Project pages are normal HTML files inside `projects/`.

The NESSO "Open Live Dashboard" button still links to:
https://nesso-safety-dashboard.onrender.com/
