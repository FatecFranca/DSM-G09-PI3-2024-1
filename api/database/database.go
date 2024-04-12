package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MONGO_HOST = os.Getenv("MONGO_HOST")
var MONGO_PORT = os.Getenv("MONGO_PORT")
var MONGO_DATABASE = os.Getenv("MONGO_DATABASE")

func Connect(ctx context.Context) error {
	uri := fmt.Sprintf("mongodb://%s:%s/%s", MONGO_HOST, MONGO_PORT, MONGO_DATABASE)
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
		return err
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
		return err
	}

	fmt.Println("Conectado ao MongoDB!")
	return nil
}
