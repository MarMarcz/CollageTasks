FROM node:14

WORKDIR /app

COPY src/package*.json ./

RUN npm install

COPY src/ .

CMD ["node", "index.js"]
