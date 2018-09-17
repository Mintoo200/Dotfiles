#!/bin/sh

CONFS="/home/gauthier.fiorentino/afs/.confs/"
GITREPO="/home/gauthier.fiorentino/afs/gauthier.fiorentino/Config/"

FILELIST="$CONFS/bashrc $CONFS/vimrc $CONFS/confExport.sh"

if [ $# -eq 0 ]; then
    cp -u -t "$GITREPO" $FILELIST
else
    cp -u "$CONFS$1" "$GITREPO"
fi

cd "$GITREPO"
git add -A
git commit -m  "Update: $(date +"%A %d %Y at %T %Z") ($(date -u +"%T %Z"))."
git push
exit 0
