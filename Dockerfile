FROM node:14.18.2-alpine3.13

WORKDIR /usr/src/app

ENV SERVER_PORT=8080 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3100

CMD [ "npm", "start" ]