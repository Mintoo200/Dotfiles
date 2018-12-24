#!/bin/sh

FILES=$(find -name ".*" ! -name ".git" ! -name ".")

if [ $# -ne 0 ]; then
    FILES=".$1"
fi

cp -r -t ${HOME} ${FILES}
