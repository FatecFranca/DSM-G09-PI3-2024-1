package database

import (
    "context"
    "fmt"
    "log"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client
var uri fmt.Sprintf("mongodb://%s:%s/%s", MONGO_HOST, MONGO_PORT, MONGO_DATABASE)

func Connect(ctx context.Context, uri string) error {
    clientOptions := options.Client().ApplyURI(uri)

    var err error
    Client, err = mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatal(err)
        return err
    }

    err = Client.Ping(ctx, nil)
    if err != nil {
        log.Fatal(err)
        return err
    }

    fmt.Println("Conectado ao MongoDB!")
    return nil
}
