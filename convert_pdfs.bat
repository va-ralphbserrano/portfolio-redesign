@echo off
setlocal enabledelayedexpansion
cd /d %~dp0
mkdir "public\images\projects" 2>nul

set "MAGICK=C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe"

for %%f in (public\pdfs\*.pdf) do (
    set "fname=%%~nf"
    set "fname=!fname: =-!"
    set "fname=!fname!-thumb.jpg"
    "!MAGICK!" convert -density 150 "%%f"[0] -quality 85 -resize 800x800 "public\images\projects\!fname!"
)
