FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN yarn install --production

COPY . .

RUN yarn build

COPY docker-entrypoint.sh .

EXPOSE 4000

ENTRYPOINT ["/bin/sh", "./docker-entrypoint.sh"]
