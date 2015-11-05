#!/bin/sh

for entry in ./packages/*; do
  ./node_modules/.bin/babel -d ${entry}/dist ${entry}/src/
  echo ''
done

./node_modules/.bin/babel -d ./ ./src/
