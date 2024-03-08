FROM node:18-slim

WORKDIR /srv/backend

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE 4000

CMD [ "yarn", "dev" ]
