FROM node:slim

COPY . .

RUN npm install --loglevel=error

ENTRYPOINT ["node", "/src/index.js"]