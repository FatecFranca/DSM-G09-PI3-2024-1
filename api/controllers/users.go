package controllers

import (
	"context"
	"net/http"

	"github.com/FatecFranca/DSM-G09-PI3-2024-1/api/database"
	"github.com/FatecFranca/DSM-G09-PI3-2024-1/api/models"
	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	var user models.Usuario
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	existingUserByEmail, err := database.GetUserByEmail(context.Background(), user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar usuário"})
		return
	}
	if existingUserByEmail != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Já existe um usuário com o mesmo email"})
		return
	}

	existingUserByCPF, err := database.GetUserByCPF(context.Background(), user.CPF)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar usuário"})
		return
	}
	if existingUserByCPF != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Já existe um usuário com o mesmo CPF"})
		return
	}

	hashedPassword, err := hashPassword(user.Senha)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar hash da senha"})
		return
	}
	user.Senha = hashedPassword

	result, err := database.InsertUser(context.Background(), &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar usuário"})
		return
	}

	c.JSON(http.StatusCreated, result)
}
