FROM node:14

WORKDIR /api

COPY api/package*.json ./

RUN npm install

COPY api/ .

CMD [ "node", "index.js" ]
