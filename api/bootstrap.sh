#!/bin/bash

# URL base
BASE_URL="http://localhost:3000"

# Dados para criar um novo usuário
USER_DATA='{
  "nome": "Isabela",
  "cpf": "147.456.789-00",
  "dataNascimento": "1990-01-01",
  "municipio": "São Paulo",
  "uf": "SP",
  "telefone": "11999999999",
  "email": "isla@example.com",
  "senha": "senha123",
  "bio": "Bio de Isabela"
}'

# Criar um novo usuário
echo "Creating a new user..."
USER_RESPONSE_CREATE=$(curl -s -X POST -H "Content-Type: application/json" -d "$USER_DATA" "$BASE_URL/usuarios")

echo "Response create: $USER_RESPONSE_CREATE"
USER_ID=$(echo $USER_RESPONSE_CREATE | jq -r '.insertedId')

if [ "$USER_ID" = "null" ]; then
  echo "Error creating user: $USER_RESPONSE_CREATE"
  exit 1
fi
echo "User created with ID: $USER_ID"

# Obter o usuário criado pelo ID
echo "Getting the user by ID..."
$USER_RESPONSE_RECOVER =$(curl -s "$BASE_URL/usuarios/$USER_ID")
echo "Response recover: $USER_RESPONSE_RECOVER"

# Atualizar o usuário criado
UPDATED_USER_DATA='{
  "nome": "Isabela Silva",
  "telefone": "11988888888"
}'
echo "Updating the user..."
curl -s -X POST -H "Content-Type: application/json" -d "$UPDATED_USER_DATA" "$BASE_URL/usuarios/$USER_ID"


# Obter o usuário criado pelo ID
echo "Getting the user by ID..."
$USER_RESPONSE_RECOVER =$(curl -s "$BASE_URL/usuarios/$USER_ID")
echo "Response recover: $USER_RESPONSE_RECOVER"


# Dados para criar um novo registro
REGISTER_DATA='{
  "titulo": "Primeiro Registro",
  "descricao": "Descrição do primeiro registro",
  "url_imagem": ["url1", "url2"],
  "local": "São Paulo",
  "valor_gasto": 100,
  "usuario": "'$USER_ID'"
}'

# Criar um novo registro
echo "Creating a new register..."
REGISTER_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "$REGISTER_DATA" "$BASE_URL/registros")
REGISTER_ID=$(echo $REGISTER_RESPONSE | jq -r '..insertedId')

if [ "$REGISTER_ID" == "null" ]; then
  echo "Error creating register: $REGISTER_RESPONSE"
  exit 1
fi
echo "Register created with ID: $REGISTER_ID"

# Obter o registro criado pelo ID
echo "Getting the register by ID..."
curl -s "$BASE_URL/registros/$REGISTER_ID" | jq

# Atualizar o registro criado
UPDATED_REGISTER_DATA='{
  "titulo": "Registro Atualizado",
  "descricao": "Descrição atualizada"
}'
echo "Updating the register..."
curl -s -X POST -H "Content-Type: application/json" -d "$UPDATED_REGISTER_DATA" "$BASE_URL/registros/$REGISTER_ID"

# Obter todos os registros de um usuário específico
echo "Getting all registers by user ID..."
curl -s "$BASE_URL/registros-by-user/$USER_ID" | jq

# Deletar o registro criado
echo "Deleting the register..."
curl -s -X DELETE "$BASE_URL/registros/$REGISTER_ID"

# Deletar o usuário criado
echo "Deleting the user..."
curl -s -X DELETE "$BASE_URL/usuarios/$USER_ID"

echo "Script completed."
