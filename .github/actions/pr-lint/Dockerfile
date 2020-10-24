FROM node:slim

COPY . .

RUN npm install --loglevel silent

ENTRYPOINT ["node", "/src/index.js"]