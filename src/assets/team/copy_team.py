
# This script copies the team photo from Claude's uploads to your project
# Run this once from PowerShell: python copy_team.py

import shutil, os, sys

# Possible source paths (Claude upload locations)
sources = [
    r"C:\Users\Public\Downloads\IMG_1806.png",
    r"C:\Users\Public\IMG_1806.png",
]

dest = r"D:\Projects\IuXoa\1\src\assets\team\team-group.jpg"

# Check if user manually placed the file
for src in sources:
    if os.path.exists(src):
        shutil.copy2(src, dest)
        print(f"Copied from {src}")
        sys.exit(0)

print("Please manually copy your team photo (IMG_1806.png) to:")
print(dest)
print("Then rename it to team-group.jpg")
