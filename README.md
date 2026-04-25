# Tecnologias Para Desenvolvimento Web — PUCPR

Aplicação React com 3 páginas (Cadastro, Login e Principal) integrada ao Firebase Authentication (e-mail/senha) e Firestore, com rotas em arquivo separado usando React Router DOM.

## Estrutura

```
src/
  firebase/config.js      # Inicialização do Firebase (auth + Firestore)
  routes/AppRoutes.js     # Definição das rotas
  pages/
    Cadastro.js           # Página 1 — cria usuário no Auth e grava dados no Firestore
    Login.js              # Página 2 — valida credenciais e redireciona
    Principal.js          # Página 3 — exibe nome, sobrenome e data de nascimento
```

## Pré-requisitos

1. Criar um projeto no [Firebase Console](https://console.firebase.google.com/).
2. Em **Authentication → Sign-in method**, habilitar o provedor **E-mail/senha**.
3. Em **Firestore Database**, criar o banco em modo de produção ou teste.
4. Em **Project settings → Your apps**, registrar um app web e copiar as credenciais.

## Configuração local

Copie `.env.example` para `.env.local` e preencha com as credenciais do seu projeto Firebase:

```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

## Rodar em desenvolvimento

```bash
npm install
npm start
```

Aplicação em `http://localhost:3000`.

## Build de produção

```bash
npm run build
```

Os arquivos otimizados ficam em `build/`.

## Deploy no Firebase Hosting

1. Instale a CLI (uma vez): `npm install -g firebase-tools`
2. Faça login: `firebase login`
3. Ajuste `.firebaserc` substituindo `REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID` pelo ID real do seu projeto.
4. Gere o build: `npm run build`
5. Faça o deploy: `firebase deploy --only hosting`

A URL pública será exibida ao final (ex.: `https://SEU-PROJETO.web.app`).

### Alternativas de hospedagem

O projeto é um bundle estático (`build/`), compatível com qualquer host estático — Vercel, Netlify, GitHub Pages, Cloudflare Pages etc.

## Regras mínimas sugeridas do Firestore

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
