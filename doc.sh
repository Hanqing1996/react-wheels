rm -rf docs
yarn doc:build
git add docs
git commit -m"update docs"
git push