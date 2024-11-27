# SpeedLog

## Descrição do Projeto
SpeedLog é uma plataforma de gerenciamento de entregas por motoboys, projetada para facilitar o processo de solicitação de transporte por clientes e a gestão de corridas pelos motoboys. A solução permite que os usuários acompanhem o status de suas entregas em tempo real e ajuda a empresa a calcular os valores de frete de forma automática e precisa.

## Funcionalidades Principais
- **Clientes**: 
  - Solicitar transporte de mercadorias.
  - Acompanhar status da entrega (agendada, em andamento, finalizada ou cancelada).
  - Ver informações sobre o motoboy (nome, foto, tempo estimado de entrega).
  - Acessar a plataforma pelo smartphone e avaliar o serviço.

- **Motoboys**:
  - Escolher as entregas que desejam atender.
  - Ver informações da entrega (origem, destino, distância, tempo estimado).
  - Acessar perfil e visualizar ganhos.
  - Acessar a plataforma pelo smartphone.

- **Administradores**:
  - Visualizar todas as entregas e seus status.
  - Editar parâmetros de cálculo de frete (peso, distância, tempo).

## Tecnologias Utilizadas
- **Front-end**: React, Tailwind CSS
- **Back-end**: Node.js (Express), Mongoose (MongoDB), JWT (Autenticação), Bcrypt (Segurança), Multer (Upload de Arquivos), Zod (Validação)

## APIs Utilizadas
- [SpeedLog API](https://docs.google.com/document/d/1NkNeoFoidibUWTDqDHKmyhoure3wSzZYXggxYX0GcpM/edit?usp=sharing)
- [Componentes React: Material UI](https://mui.com/)
- [API de CEP: ViaCEP](https://viacep.com.br/)