package main

import (
	"context"

	"github.com/FatecFranca/DSM-G09-PI3-2024-1/api/database"
	"github.com/FatecFranca/DSM-G09-PI3-2024-1/api/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	ctx := context.Background()
	err := database.Connect(ctx)
	if err != nil {
		panic(err)
	}

	router := gin.Default()

	routes.SetupRoutes(router)

	router.Run(":3000")
}
