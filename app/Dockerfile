FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . /app/build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build .

EXPOSE 3000

CMD ["npm", "start"]
