#!/bin/bash
# Adapted from https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

set -e
SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into out/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deploy)
git clone $REPO out
cd out
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..
rm -rf out/**/* || exit 0

# Get the SSH key used to push to GitHub and add it to our keychain
openssl aes-256-cbc -K $encrypted_5066e7a45474_key -iv $encrypted_5066e7a45474_iv -in config/github-ssh-key.enc -out config/github-ssh-key -d
chmod 600 config/github-ssh-key
eval `ssh-agent -s`
ssh-add config/github-ssh-key

# Copy compiled assets to out/ and commit them.
mv dist/* out/
cd out
if [ -z `git diff --exit-code` ]; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi
git add .
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"
git commit -m "Deploy to GitHub Pages: ${SHA}"
git push $SSH_REPO $TARGET_BRANCH
