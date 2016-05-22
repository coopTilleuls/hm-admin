FROM gorghoa/php7

WORKDIR /app

RUN composer  create-project --no-scripts --no-dev api-platform/api-platform ./ v2.0.0-alpha.1 \
    && rm -Rf src/AppBundle/Entity/*

COPY ./start.sh ./start.sh
RUN chmod +x ./start.sh

RUN  composer require --dev api-platform/schema-generator

COPY ./parameters.yml ./app/config/parameters.yml
COPY ./schema.yml ./app/config/schema.yml

RUN php ./vendor/bin/schema generate-types src/ app/config/schema.yml

CMD ["bash", "/app/start.sh"]
