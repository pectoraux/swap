#!/bin/bash

mkdir -p levels

numLevels=$(sudo cat js/levels.js | grep 'tiles' | wc -l) #counts number of levels (not sure why superuser was required, but it was)


for i in $(seq 0 1 $(($numLevels - 1)))
do
   touch "levels/level$i.html"
   cat "template.html" > "levels/level$i.html"
done

git push origin master

git checkout gh-pages
git merge master

git push origin gh-pages
