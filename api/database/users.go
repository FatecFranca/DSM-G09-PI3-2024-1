package database

import (
	"context"
	"log"

	"github.com/FatecFranca/DSM-G09-PI3-2024-1/api/models"
	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection *mongo.Collection

func InsertUser(ctx context.Context, user *models.Usuario) (*mongo.InsertOneResult, error) {
	result, err := userCollection.InsertOne(ctx, user)
	if err != nil {
		log.Println("Erro ao inserir usuário no banco de dados:", err)
		return nil, err
	}
	return result, nil
}
