#!/bin/sh

CONFS="/home/mintoo200/"
GITREPO="/home/mintoo200/Documents/Dotfiles/"

FILELIST="$CONFS/bashrc $CONFS/vimrc $CONFS/vim $CONFS/i3lock.png $CONFS/background.png $CONFS/gitconfig_confExport"

if [ $# -eq 0 ]; then
    cp -u -r -t "$GITREPO" $FILELIST 1> /dev/null
else
    cp -u -r "$CONFS$1" "$GITREPO" 1> /dev/null
fi

cd "$GITREPO"
git add -A 1> /dev/null
git commit -m  "Update: $(date +"%A %d %Y at %T %Z") ($(date -u +"%T %Z"))." 1> /dev/null
git push 1> /dev/null
exit 0
