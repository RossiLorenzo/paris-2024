#!/usr/bin/env sh

# Step 1: Run npm run build
npm run build
# Step 2: Commit and push changes to master branch
git add .
git commit -m "Build and deploy"
git push origin master
# Step 3: Publish content of dist to gh-pages branch
cd dist
git add .
git commit -m "Publish to GitHub Pages"
git push origin gh-pages
cd -
