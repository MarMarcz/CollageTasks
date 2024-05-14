FROM postgres

ENV POSTGRES_USER=dbuser
ENV POSTGRES_PASSWORD=secretpassword
ENV POSTGRES_DB=mydb

COPY init.sql /docker-entrypoint-initdb.d/init.sql
