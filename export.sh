#!/bin/sh

CONFS=${HOME}
GITREPO="${HOME}/Documents/Dotfiles/"

FILELIST="
bashrc
fehbg
gitconfig
i3lock.png
i3lock_script.sh
vimrc
wallpaper.jpg
config"

__copy_files() {
    for file in $FILELIST; do
        cp -u -r "${CONFS}/.${file}" "$GITREPO"
    done
}

__push_on_git() {
    cd "$GITREPO"
    git add -A
    git commit -m  "Update: $(date +"%A %d %Y at %T %Z") ($(date -u +"%T %Z"))."
    git push
    exit 0
}

if [ $# -ne 0 ]; then
    FILELIST=$1
fi
__copy_files
__push_on_git
