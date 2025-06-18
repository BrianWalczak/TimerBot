FROM node:20-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 7000
CMD ["node", "index.js"]