package routes

import (
	"github.com/FatecFranca/DSM-G09-PI3-2024-1/api/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	//	profile := route.Group("/profile"){
	//		profile.GET("/profile", controllers.getProfile)
	//	}
	router.GET("/", controllers.HealthCheckHandler)
}
