# Contributing

## Set up your development environment

### docker development environment

Please note that using docker is not mandatory, feel free to develop with your local environment.

To quickly start hacking, hm-admin comes with a docker ready development environment.

It leverages three services:

- `hm-admin`: The interesting part in our case. Hm-admin is running in this container and hm-admin sources are shared with the host
- `api` and `mysql`: Those containers are responsible for the API to be developed and tested against. The API is made from https://api-platform.com/.

#### Initial steps for setting up your docker development environment

Install node dependencies

```
docker-compose run hm-admin npm install
```

Your environment should be now ready to run

#### Launch docker development environment

```
docker-compose up
```

Now, your hm-admin should be accessible at http://dockerhost:4200 (where `dockerhost` is the docker host in your local setup. It could be `localhost`, `docker.local`, `dockerhost`, I don’t know but you should ;) ).

The API part should be accessible at http://dockerhost:60000, you may want to see the API doc at http://dockerhost:60000/doc.

#### troubleshotting

If API is never available at http://dockerhost:60000, you may want to change the logging driver of services `mysql` and `api` from `none` to `json-file`. Then restart `docker-compose up` and analyse the output of mysql and the API.
