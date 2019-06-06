#!/bin/sh

CONFS=${HOME}
GITREPO="$(pwd)"

FILELIST="
bashrc
fehbg
gitconfig
i3lock.png
i3lock_script.sh
vimrc
wallpaper.jpg
config/i3/config
config/i3status/config
config/termite/config"

__copy_files() {
    for file in $FILELIST; do
        PATHTOFILE="$(dirname $file)";
        mkdir -p ".${PATHTOFILE}";
        cp -u -r "${CONFS}/.${file}" "$GITREPO/.${PATHTOFILE}"
    done
}

__push_on_git() {
    cd "$GITREPO"
    git add -A
    git commit -m  "Update: $(date +"%A %d %B %Y at %T %Z") ($(date -u +"%T %Z"))."
    git push
    exit 0
}

if [ $# -ne 0 ]; then
    FILELIST=$1
fi
__copy_files
__push_on_git
