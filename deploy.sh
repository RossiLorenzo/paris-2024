#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# First commit the code
git add -A
git commit -m 'update code'
git push -f origin master

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git remote add origin git@github.com:RossiLorenzo/paris-2024.git
git add -A
git commit -m 'deploy'
git branch gh-pages

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f origin gh-pages

cd -