FROM node:lts-alpine3.23

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm","run","dev" ]