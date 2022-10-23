FROM node:16

WORKDIR /app

COPY package.json  ./
COPY pnpm-lock.yaml ./

RUN pnpm install

# Bundle app source
COPY . .

RUN pnpm build

ENV NODE_ENV production
EXPOSE 8080
CMD ["node", "dist/src/index.js"]
USER node