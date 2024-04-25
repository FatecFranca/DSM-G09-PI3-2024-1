package database

import (
	"context"
	"log"

	"github.com/FatecFranca/DSM-G09-PI3-2024-1/api/models"
	"go.mongodb.org/mongo-driver/bson"
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
func GetUserByEmail(ctx context.Context, email string) (*models.Usuario, error) {
	user := &models.Usuario{}
	err := userCollection.FindOne(ctx, bson.M{"email": email}).Decode(user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		log.Println("Erro ao buscar usuário pelo email:", err)
		return nil, err
	}
	return user, nil
}

func GetUserByCPF(ctx context.Context, cpf string) (*models.Usuario, error) {
	user := &models.Usuario{}
	err := userCollection.FindOne(ctx, bson.M{"cpf": cpf}).Decode(user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		log.Println("Erro ao buscar usuário pelo CPF:", err)
		return nil, err
	}
	return user, nil
}
