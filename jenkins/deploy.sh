#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)
TAG=$(git describe)

echo "BRANCH is $BRANCH"
echo "TAG is $TAG"

if [[ $BRANCH = "master" || $BRANCH =~ ^[0-9]*\.[0-9]*\.[0-9]*$ ]]; then

  # Make sure this is tagged before deploying
  if [[ ! $TAG =~ ^[0-9]*\.[0-9]*\.[0-9]*$ ]]; then
    echo "Master branch is not tagged. Not deploying to artifactory..." 1>&2
    echo "In master or version branch, not deploying as no git tag is present"
    mvn clean package
  else
    echo "Deploying"
    mvn clean deploy
  fi


else
  mvn clean package

fi

