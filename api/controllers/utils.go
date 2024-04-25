package controllers

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
)

func hashPassword(password string) (string, error) {
	hasher := md5.New()
	_, err := hasher.Write([]byte(password))
	if err != nil {
		fmt.Println("Erro ao gerar hash da senha:", err)
		return "", err
	}

	hashedBytes := hasher.Sum(nil)
	hashedString := hex.EncodeToString(hashedBytes)

	return hashedString, nil
}
