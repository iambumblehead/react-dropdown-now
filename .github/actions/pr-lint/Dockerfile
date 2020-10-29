FROM node:slim

COPY . .

RUN npm install -g npm
RUN npm install --no-update-notifier
CMD echo start

ENTRYPOINT ["node", "/src/index.js"]