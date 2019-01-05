time=$(date "+%Y-%m-%d %H:%M:%S")
git config core.autocrlf
git add . -A
git commit -m "deploy at ${time}"
git push origin source 