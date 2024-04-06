package main


import "src/database"

import (
    "context"
    "fmt"
    "net/http"


    "github.com/gin-gonic/gin"
)

func main() {
    ctx := context.Background()
    err := database.Connect(ctx) // Invoque a função Connect sem passar a URI
    if err != nil {
        panic(err)
    }

    router := gin.Default()

    router.Run("localhost:8080")
}
