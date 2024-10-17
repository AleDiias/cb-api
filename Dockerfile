FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=root_password
ENV MYSQL_DATABASE=vnxdb_chatbot
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=user_password

EXPOSE 3307

CMD ["mysqld"]