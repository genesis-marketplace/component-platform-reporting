#!/usr/bin/env sh

if [ ! -d "$HOME/.gradle" ]; then
  mkdir "$HOME/.gradle"
fi

if [ -f "$HOME/.gradle/gradle.properties" ]; then
  rm "$HOME/.gradle/gradle.properties"
fi

touch $HOME/.gradle/gradle.properties

echo genesisArtifactoryUser="$genesisArtifactoryUser" >> $HOME/.gradle/gradle.properties
echo genesisArtifactoryPassword="$genesisArtifactoryPassword" >> $HOME/.gradle/gradle.properties

# Docker repository variables
if [ -n "$dockerUrl" ]; then
  echo dockerUrl="$dockerUrl" >> $HOME/.gradle/gradle.properties
fi
if [ -n "$dockerUsername" ]; then
  echo dockerUsername="$dockerUsername" >> $HOME/.gradle/gradle.properties
fi
if [ -n "$dockerPassword" ]; then
  echo dockerPassword="$dockerPassword" >> $HOME/.gradle/gradle.properties
fi
if [ -n "$dockerEmail" ]; then
  echo dockerEmail="$dockerEmail" >> $HOME/.gradle/gradle.properties
fi

echo systemProp.org.gradle.internal.http.connectionTimeout=180000 >> $HOME/.gradle/gradle.properties
echo systemProp.org.gradle.internal.http.socketTimeout=180000 >> $HOME/.gradle/gradle.properties
