FROM node

WORKDIR /usr/local/app
ADD ./src/ /usr/local/app
RUN npm install

ENV HTTP_PORT 80
EXPOSE 80


CMD node app.js