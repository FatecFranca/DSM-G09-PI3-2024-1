package routes

import (
    "context"
    "fmt"
    "net/http"

    "github.com/gin-gonic/gin"
)

func getAlbums(c *gin.Context) {
    client := database.Client.Database("mydb")


    c.IndentedJSON(http.StatusOK, albums)
}
