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
gh-pages -d dist

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f origin gh-pages

cd -