FROM node:20.12.2

WORKDIR /api

COPY ./package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]
