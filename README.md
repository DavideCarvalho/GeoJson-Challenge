# GeoJson Challenge

## Sobre
Desafio que consiste em criar uma API com a possibilidade de
- Adicionar um parceiro
- Achar um parceiro por id
- Procurar o parceiro com uma área de cobertura mais próxima, passando apenas latitude e longitude

## Como rodar localmente
Esse projeto usa um banco Mongo em memória, então apenas rode ``npm run start`` para rodar o projeto

##Deploy
Crie as seguintes variáveis de ambiente:
- NODE_ENV: Essa variável define o ambiente que estamos trabalhando, no caso do ambiente de deploy, ela
deverá estar como ``PROD``
- MONGODB_URI: Quando o NODE_ENV é ``PROD``, precisamos passar a URI de conexão do MONGO,
e.g: `mongodb://mongodb0.example.com:27017/admin`

Use o comando ``npm run build``, isso gerará uma pasta `dist`, agora use o comando ``npm run start:prod``.

##Testes
Como esse projeto tem uma lógica forte com queries no banco, então o foco foi criar testes de integração
capazes de reproduzir cenários o mais próximos possíveis da realidade, dando maior segurança aos testes.

use o comando ``npm run test:e2e`` para ver os testes de integração.

Os testes de integração se encontram na pasta ``test``

##Code Style
O NestJS tem um code style bem parecido com Angular (na questão de módulos) e 
Spring Boot(relacionado a ser um framework backend).

#### Módulo
Um módulo é um contexto que poderia ser isolado em um micro serviço caso necessário. Um módulo pode ter
vários services, controllers, repositoties, etc...

#### Domain
São classes (ou no caso do mongoose, são Schemas) que mapeiam as tabelas do banco (No caso do mongo, os documentos).

#### Repository
Responsáveis por fazer as queries de acesso ao banco, usando os Domains

#### Service
Regra de negócio do Domain, ou seja, se tiver um Domain "XPTO", terá um "XPTOService".

#### Interface
Servem apenas para tipagem

#### Controller
Responsáveis por fazer a interface REST da aplicação. Eles recebem a requisição, chamam o service necessário,
e transformam o resultado do service na resposta da api - Como podemos ver, transformamos usando
a lib ``class-transformer``




