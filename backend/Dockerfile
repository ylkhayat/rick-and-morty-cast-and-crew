FROM node:18-slim

WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json yarn.lock ./

RUN yarn install

COPY . ./

# RUN yarn prisma migrate deploy

EXPOSE 4000

# Run the web service on container startup.
CMD [ "yarn", "dev" ]
