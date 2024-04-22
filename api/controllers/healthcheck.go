package controllers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HealthCheckHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "ok from gin",
	})

	log.Println("Health check request received")
}
