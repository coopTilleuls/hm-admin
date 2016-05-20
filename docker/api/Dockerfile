FROM gorghoa/php7

WORKDIR /app


RUN composer  create-project api-platform/api-platform ./ v2.0.0-alpha.1

COPY ./parameters.yml ./app/config/parameters.yml
COPY ./start.sh ./start.sh

RUN chmod +x ./start.sh

CMD ["bash", "/app/start.sh"]
