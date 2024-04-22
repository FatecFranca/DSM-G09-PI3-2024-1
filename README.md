# DSM-G09-PI3-2024-1
Repositório do GRUPO 09 do Projeto Interdisciplinar do 3º semestre DSM 2024/1. Alunos: Isabela Maria de Oliveira, Izabela Tayná Reis Coimbra, Kauê José Abdalla Leal, Pedro Victor Virgino da Cunha, Victor Ferreira Neves


# Rodando a aplicação

## Requisitos
* docker e docker-compose instalados
    * [Windows](https://docs.docker.com/desktop/install/windows-install/) [Linux](https://docs.docker.com/desktop/install/linux-install/)
    * Atentar para virtualização habilitada no processador do computador

## Comandos
1. Na pasta root do projeto, `docker-compose up`
2. Se o daemon não estiver rodando, no windows é só abrir o docker desktop, já no linux `sudo systemctl start docker`
3. Ao fazer alguma alteração no back ou front, `docker-compose down && docker-compose up -d --build` deve resolver