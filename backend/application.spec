vc
# -*- mode: python ; coding: utf-8 -*-
block_cipher = None

a = Analysis(
    ['application.py'],  # Main application script
    pathex=['DEV/backend'],  # Path to your backend directory
    binaries=[],
    datas=[
        ('DEV/frontend/build', 'build'),  # Include the frontend build directory
    ],
    hiddenimports=[],
    hookspath=[],
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name='application',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True
)
