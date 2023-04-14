#!/bin/sh
while true
do
    # if [ -d ./node_modules ]
    # then
    #     npm install && echo Aktualizuje Pakiety ...
    # else
    #     yarn add . && echo Aktualizuje Pakiety ...
    # fi
    # sleep 4
    node . || yarn node .
    echo Wlanczanie Bota Prosze Czekac ...
    sleep 2
done