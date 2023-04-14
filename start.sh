#!/bin/sh
while true
do
    node . || yarn node .
    echo Wlanczanie Bota Prosze Czekac ...
    sleep 2
done