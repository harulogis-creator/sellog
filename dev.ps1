# 프로젝트 폴더에서 npm run dev 실행 (Node 경로 설정 후 실행)
Set-Location $PSScriptRoot
$env:Path = "C:\Program Files\nodejs;" + $env:Path
& "C:\Program Files\nodejs\npm.cmd" run dev
