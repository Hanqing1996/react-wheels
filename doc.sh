rm -rf docs
yarn docs:build
git add *
git commit -m"update docs"
git push