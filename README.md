# App

👊 GymPass style app.

## ⚒️ RFs (Requisitos funcionais - Funcionalidades do sistema)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histório de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas até 10km;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-ins em uma academia;
- [x] Deve ser possível valida o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## 🔑 RNs (Regras de negócio - Regras que o sistema vai ter com base nos requitos funcionais.)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-ins se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais) - (Algo mais técnico que só os desenvolvedores entendem e não o usuário final)

- [x] A senha do usuário precisa estar criptografadas;
- [x] Os dados da aplicação precisam estar persistido em um banco PostgreSQL;
- [x] Todos listas de dados precisar estar paginadas com 20 itens por página;
- [x] O usuário deve ser indentificados por um JWT (JSON Web Token);
