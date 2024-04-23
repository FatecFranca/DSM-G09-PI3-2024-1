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

	result, err := database.InsertUser(context.Background(), &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar usuário"})
		return
	}

	c.JSON(http.StatusCreated, result)
}
