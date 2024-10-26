FROM node:latest

EXPOSE 4000

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

CMD npx prisma migrate dev --name init && npm start