#!/bin/sh
set -e

# setup ssh-agent and provide the GitHub deploy key
openssl aes-256-cbc -K $encrypted_f217180e22ee_key -iv $encrypted_f217180e22ee_iv -in .travis/id_rsa.enc -out ~/.ssh/id_rsa -d

# 对解密后的私钥添加权限
chmod 600 ~/.ssh/id_rsa

# 启动 ssh-agent
eval "$(ssh-agent -s)"

ssh-add ~/.ssh/id_rsa
# pwd
cp .travis/ssh_config ~/.ssh/config

# 删除解密后的私钥
# rm deploy

git config --global user.name "wxrbwran"
git config --global user.email "wxrbw@qq.com"

ssh ubuntu@123.206.90.112 -p 22 'cd /home/ubuntu/sites/uikit && yarn && yarn build-storybook'
