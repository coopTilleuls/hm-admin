#!/bin/bash

until mysql -h mysql -u api-platform -papi-platform -e ";" ; do
   echo "."
done


php bin/console doctrine:schema:update -f
php bin/console server:run 0.0.0.0:60000 -e prod
