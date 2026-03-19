import subprocess
import sys
import os

def setup_beeware():
    print("ToryEngine Studio: Mobile Build Initializer (Python/BeeWare)")
    print("----------------------------------------------------------")
    
    # 1. Install Briefcase
    print("Step 1: Installing BeeWare Briefcase...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "briefcase"])
    except Exception as e:
        print(f"Error installing briefcase: {e}")
        return

    # 2. Instructions
    print("\nStep 2: Initialize the Mobile Project")
    print("Run the following command and follow the prompts:")
    print("   briefcase new")
    print("\nWhen prompted for 'GUI Framework', choose 'None' (we use HTML/JS).")
    print("\nStep 3: Asset Migration")
    print("Copy 'index.html', 'style.css', and 'assets/' into the generated project's 'src' folder.")
    
    print("\nStep 4: Build for Android")
    print("   briefcase create android")
    print("   briefcase build android")
    print("   briefcase run android")

if __name__ == "__main__":
    setup_beeware()
