[cmdletbinding()]
param (
    [parameter()]
    [switch]$Package
)

npm run compile
Copy-Item "$PSScriptRoot/src/img" "$PSScriptRoot/out" -Recurse -Force

if ($Package) {
    vsce package
}