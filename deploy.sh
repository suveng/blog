#!/bin/sh

time=$(date "+%Y%m%d-%H%M%S")

cd blog/theme 
java -jar sitemapGen.jar
cd ../../
git config core.autocrlf
git add . -A
git commit -m "deploy at time"
git push origin source 

