FROM node:slim

COPY . .

RUN export npm_config_loglevel="silent npm version"

RUN npm install --loglevel silent

ENTRYPOINT ["node", "/src/index.js"]