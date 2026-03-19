# ToryEngine Studio: Python-Based EXE Build Guide

This folder contains a professional Python wrapper for ToryEngine Studio using `pywebview`. This approach provides a native-like experience with hardware acceleration.

## Prerequisites
1. Python 3.8 or higher installed.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the IDE
To launch the Studio IDE directly via Python:
```bash
python studio_app.py
```

## Generating the .EXE
To compile the IDE into a standalone Windows executable:
1. Run the packaging script:
   ```bash
   python package_exe.py
   ```
2. Wait for the build sequence to complete.
3. Your standalone app will be located in the `dist/ToryEngineStudio.exe`.

## Why use the Python Wrapper?
- **Native Windowing**: Proper OS title bars and window management.
- **Persistence**: Better handling of local storage and system resources.
- **Performance**: Direct access to native WebEngine rendering.
