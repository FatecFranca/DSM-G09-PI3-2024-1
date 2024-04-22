package main

import (
	"net/http"
	// "log"
	"github.com/FatecFranca/DSM-G09-PI3-2024-1/api/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// ctx := context.Background()
	// err := database.Connect(ctx)
	// if err != nil {
	// 	panic(err)
	// }

	router := gin.Default()
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	})

	routes.SetupRoutes(router)

	router.Run(":3000")

	// log.Fatal(router.Run(":3000"))
}
