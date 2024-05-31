#!/bin/bash

# URL base
BASE_URL="http://localhost:3000"

# Dados para criar um novo usuário
USER_DATA='{
  "nome": "Isabela",
  "cpf": "178.955.789-00",
  "dataNascimento": "1990-01-01",
  "municipio": "São Paulo",
  "uf": "SP",
  "telefone": "11999999999",
  "email": "idfrz@example.com",
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
USER_RESPONSE_RECOVER=$(curl -s "$BASE_URL/usuarios/$USER_ID")
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
USER_RESPONSE_RECOVER=$(curl -s "$BASE_URL/usuarios/$USER_ID")
echo "Response recover: $USER_RESPONSE_RECOVER"

# Create an itinerary using the correct quote usage for ITINERARY_DATA
ITINERARY_DATA=$(cat <<EOF
{
  "usuario": "$USER_ID",
  "titulo": "Viagem a Rio de Janeiro",
  "descricao": "Roteiro turístico de 5 dias pela cidade maravilhosa",
  "pontosTuristicos": [
    { "nome": "Cristo Redentor" },
    { "nome": "Pão de Açúcar" }
  ],
  "hospedagens": [
    { "nome": "Ipanema Beach Hotel" }
  ],
  "lugaresComer": [
    { "nome": "Barraca do Zé" },
    { "nome": "Academia de Cachaça" }
  ]
}
EOF
)

# Create a new itinerary
echo "Creating a new itinerary..."
ITINERARY_RESPONSE_CREATE=$(curl -s -X POST -H "Content-Type: application/json" -d "$ITINERARY_DATA" "$BASE_URL/roteiros")

if [[ ! $ITINERARY_RESPONSE_CREATE ]]; then
  echo "Error creating itinerary: $ITINERARY_RESPONSE_CREATE"
  exit 1
fi

ITINERARY_ID=$(echo $ITINERARY_RESPONSE_CREATE | jq -r '.insertedId')

if [ "$ITINERARY_ID" = "null" ]; then
  echo "Error creating itinerary: $ITINERARY_RESPONSE_CREATE"
  exit 1
fi
echo "Itinerary created successfully with ID $ITINERARY_ID."

# Retrieve the newly created itinerary
echo "Retrieving the created itinerary..."
ITINERARY_RESPONSE_RECOVER=$(curl -s "$BASE_URL/roteiros/$ITINERARY_ID")
echo "Itinerary details: $ITINERARY_RESPONSE_RECOVER"

# Replace with your desired update data
UPDATED_ITINERARY_DATA='{
  "titulo": "Viagem atualizada para Florianópolis"
}'

echo "Updating the itinerary... $BASE_URL/roteiros/$ITINERARY_ID"
curl -s -X POST -H "Content-Type: application/json" -d "$UPDATED_ITINERARY_DATA" "$BASE_URL/roteiros/$ITINERARY_ID"

ITINERARY_RESPONSE_RECOVER=$(curl -s "$BASE_URL/roteiros/$ITINERARY_ID")
echo "Itinerary details after update: $ITINERARY_RESPONSE_RECOVER"

