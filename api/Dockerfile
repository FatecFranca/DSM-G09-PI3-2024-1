FROM golang:1.22.1-alpine3.19

ENV GIN_MODE=release

WORKDIR /api

RUN apk update && apk add git

COPY . .

RUN go build -o api main.go

ENTRYPOINT ["./api"]
