# Hack with docker

To quickly start hacking, hm-admin comes with a docker ready development environment.

It leverages three services:

- `hm-admin`: The interesting part in our case. Hm-admin is running in this container and hm-admin sources are shared with the host
- `api` and `mysql`: Those containers are responsible for the API to be developed and tested against. The API is made from https://api-platform.com/.


## Initial steps for setting up your docker development environment

First, you don’t want to recreate your database or redownload all node_modules each time you remove your containers so, we create two data containers:

```
docker create --name hmadmin_node_modules -v /app/node_modules tianon/true
docker create --name hmadmin_mysql_data -v /var/lib/mysql mysql:5
```

Secondly, we need to install node dependencies

```
docker-compose run hm-admin npm install
```

Your environment should be now ready to run

## Launch docker development environment

```
docker-compose up
```

Now, your hm-admin should be accessible at http://dockerhost:4200 (where `dockerhost` is the docker host in your local setup. It could be `localhost`, `docker.local`, `dockerhost`, I don’t know but you should ;) ).

The API part should be accessible at http://dockerhost:60000, you may want to see the API doc at http://dockerhost:60000/docs.
