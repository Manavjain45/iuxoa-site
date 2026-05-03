
# This script reads the image from a local temp file and copies it
$source = $env:TEMP + "\team_photo_src.jpg"
$dest = "D:\Projects\IuXoa\1\src\assets\team\team-group.jpg"

if (Test-Path $source) {
    Copy-Item $source $dest -Force
    Write-Output "Copied from temp!"
} else {
    Write-Output "Source not found at $source"
}
