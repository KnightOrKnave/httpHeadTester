FROM node

WORKDIR /usr/local/app
ADD ./src/ /usr/local/app
RUN npm install

ENV PORT 80
EXPOSE 80

CMD npm run start