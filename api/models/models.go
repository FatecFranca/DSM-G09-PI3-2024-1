package models

import (
	"time"
)

type Usuario struct {
	Nome           string    `json:"nome" bson:"nome"`
	CPF            string    `json:"cpf" bson:"cpf"`
	DataNascimento time.Time `json:"data_nascimento" bson:"data_nascimento"`
	Municipio      string    `json:"municipio,omitempty" bson:"municipio,omitempty"`
	UF             string    `json:"uf,omitempty" bson:"uf,omitempty"`
	Telefone       string    `json:"telefone" bson:"telefone"`
	Email          string    `json:"email" bson:"email"`
	Senha          string    `json:"senha" bson:"senha"`
	Bio            string    `json:"bio,omitempty" bson:"bio,omitempty"`
	Deleted        bool      `bson:"deleted" json:"-"`
}