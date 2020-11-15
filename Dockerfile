FROM node:12

ENV NODE_ENV=production

WORKDIR /bot/informative-bot

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "node", "src/index.js" ]