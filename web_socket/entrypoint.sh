#!/bin/sh
if [ ! -d $WORK/sync ]; then
    echo "can't find sync folder!"
    exit
fi
if [ ${DEBUG:=0} -eq 1 ]; then # default 0
    bash
else
    cd $WORK
    npm start
fi
