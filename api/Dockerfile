FROM golang:1.22.1-alpine3.19

# ENV GIN_MODE=release
ENV PORT=8080

WORKDIR /api

RUN apk update && apk add git

COPY . .

RUN go build -o api .

EXPOSE $PORT

ENTRYPOINT ["./api"]
