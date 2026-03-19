# ToryEngine Studio: Python-Based APK Build Guide

This folder provides a Python-based path to generate an Android APK using the **BeeWare** suite.

## Prerequisites
1. Python 3.8 or higher.
2. Java JDK 11 or higher (required for Android builds).
3. Android SDK (Briefcase will attempt to install this for you).

## Build Instructions
1. Run the initializer script to install the build suite:
   ```bash
   python setup_mobile_build.py
   ```
2. Follow the on-screen instructions to create a new mobile project.
3. Once the project is created, place ToryEngine's `index.html` and `style.css` into the project's source directory.
4. Build the APK:
   ```bash
   briefcase build android
   ```

## Unique Standalone Improvements
The Python wrapper allows ToryEngine to access native Android features if extended, such as high-performance file access and custom splash screens.
