FROM node:18-slim AS builder
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml tsconfig.base.json ./
COPY .yarn ./.yarn
COPY packages/frontend/package.json packages/frontend/
RUN yarn install

WORKDIR /app/packages/frontend
COPY packages/frontend ./
RUN yarn build

FROM node:18-slim
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.yarnrc.yml ./
COPY --from=builder /app/tsconfig.base.json ./
COPY --from=builder /app/packages/frontend ./packages/frontend
COPY --from=builder /app/node_modules ./node_modules
WORKDIR /app/packages/frontend
EXPOSE 3000
CMD ["yarn", "start"]
