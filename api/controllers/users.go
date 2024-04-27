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

func GetUserByID(c *gin.Context) {
	userID := c.Param("userID")

	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID do usuário não fornecido"})
		return
	}

	user, err := database.GetUserByID(context.Background(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar usuário"})
		return
	}

	if user == nil || user.Deleted {
		c.JSON(http.StatusNotFound, gin.H{"error": "Usuário não encontrado"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func UpdateUser(c *gin.Context) {
	userID := c.Param("userID")

	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID do usuário não fornecido"})
		return
	}

	var updatedUser models.Usuario
	if err := c.BindJSON(&updatedUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	existingUser, err := database.GetUserByID(context.Background(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar usuário"})
		return
	}
	if existingUser == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Usuário não encontrado"})
		return
	}

	if c.Request.Method == "DELETE" {
		existingUser.Deleted = true
	} else {
		existingUser.Nome = updatedUser.Nome
		existingUser.DataNascimento = updatedUser.DataNascimento
		existingUser.Municipio = updatedUser.Municipio
		existingUser.UF = updatedUser.UF
		existingUser.Telefone = updatedUser.Telefone
		existingUser.Bio = updatedUser.Bio
	}

	result, err := database.UpdateUser(context.Background(), userID, existingUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar usuário"})
		return
	}

	c.JSON(http.StatusOK, result)
}
