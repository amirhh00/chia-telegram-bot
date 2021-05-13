#!/usr/bin/env bash
sshPath=~/.ssh
file="$sshPath/config"

if [[ -e $sshPath ]]; then
  echo "The path exists"
  permission="stat -c '%a' $file"
  if [[ ! $permission == "644" ]]; then
    chmod 644 ~/.ssh/config
    echo "The file is now writable"
  fi
  uid="stat -c '%U' $file"
  if [[ ! $uid == "root" ]]; then
    chown $(whoami):$(whoami) ~/.ssh
  fi
else # file does not exists
  mkdir -p ~/.ssh && cp -r ./.ssh/* ~/.ssh/
  chown $(whoami):$(whoami) ~/.ssh
  chmod 700 ~/.ssh
  chmod 644 ~/.ssh/config
  chmod 400 ~/.ssh/id_rsa*
  chmod 644 ~/.ssh/*.pub
  echo "The file does NOT exist"
fi
