FROM node:18-slim AS builder
WORKDIR /app
COPY package.json yarn.lock tsconfig.base.json .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install

WORKDIR /app/packages/backend
COPY packages/backend ./
RUN yarn install

FROM node:18-slim
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.yarnrc.yml ./
COPY --from=builder /app/tsconfig.base.json ./
COPY --from=builder /app/packages/backend ./packages/backend
COPY --from=builder /app/node_modules ./node_modules
WORKDIR /app/packages/backend
RUN apt-get update -y && apt-get install -y openssl
EXPOSE 4000
CMD ["yarn", "dev"]
