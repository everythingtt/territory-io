import PyInstaller.__main__
import os
import platform

def build_exe():
    print("Initializing ToryEngine Studio Build Sequence...")
    
    # Define paths
    script_name = "studio_app.py"
    icon_path = "assets/rocket.ico" # Fallback to none if doesn't exist
    
    params = [
        script_name,
        "--name=ToryEngineStudio",
        "--onefile", # Bundle into a single executable
        "--windowed", # No console window
        "--add-data=index.html;.", # Include HTML
        "--add-data=style.css;.", # Include CSS
        "--add-data=manifest.webmanifest;.", # Include Manifest
        "--clean",
        "--noconfirm"
    ]

    # Add icon if exists
    if os.path.exists(icon_path):
        params.append(f"--icon={icon_path}")

    print(f"Target OS: {platform.system()} {platform.release()}")
    print("Compiling Binary...")
    
    PyInstaller.__main__.run(params)
    
    print("\n-------------------------------------------")
    print("BUILD COMPLETE: Check the 'dist' folder.")
    print("-------------------------------------------")

if __name__ == "__main__":
    build_exe()
