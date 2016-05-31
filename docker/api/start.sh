#!/bin/bash

counter=0
max=120 #wait for db to be accessible during 120 seconds
until mysql -h mysql -u api-platform -papi-platform -e ";" 2>/mylogs ; do
    counter=$(( counter + 1 ))
    if [ $counter -ge $max ]
    then
        echo "[¯\_(ツ)_/¯] API service has been waiting mysql to launch for $counter secs. Now it’s time to exit in error…"
        exit 1
    fi
    sleep 1
done

php bin/console doctrine:schema:update -f -e prod
php bin/console server:run 0.0.0.0:60000 -e prod
