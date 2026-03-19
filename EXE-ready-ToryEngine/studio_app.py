import webview
import os
import sys

def get_resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)

def run_studio():
    # Path to index.html
    html_file = get_resource_path("index.html")
    
    if not os.path.exists(html_file):
        print(f"Error: {html_file} not found.")
        return

    # Create a professional IDE window
    window = webview.create_window(
        'ToryEngine Studio [PRO]', 
        f'file://{html_file}',
        width=1280,
        height=720,
        min_size=(1024, 768),
        background_color='#020617',
        confirm_close=True
    )

    # Start the app
    webview.start(debug=False)

if __name__ == "__main__":
    run_studio()
