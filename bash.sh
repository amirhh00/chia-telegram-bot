#!/usr/bin/env bash
file=~/.ssh/config

if [[ -e $file ]]; then
  echo "The file exists"
  premission="stat -c '%a' $file"
  if [[ ! $premission == "644" ]]; then
    echo "The file is now writable"
  fi
  uid="stat -c '%U' $file"
  if [[ ! $uid == "root" ]]; then
    
  fi
else # file does not exists
  mkdir -p ~/.ssh && cp -r ./.ssh ~/
  chown $(whoami):$(whoami) ~/.ssh
  chmod 700 ~/.ssh
  echo "The file does NOT exist"
fi
