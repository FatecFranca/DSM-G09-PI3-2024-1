package main

import (
	"api/database"

	"context"

	"github.com/gin-gonic/gin"
)

func main() {
	ctx := context.Background()
	err := database.Connect(ctx)
	if err != nil {
		panic(err)
	}

	router := gin.Default()

	router.Run(:3000)
}
