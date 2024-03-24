FROM node:20

WORKDIR /app

ENV ORIGIN http://pruebastfg.antonio_priego.msierra.cloud:3000

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build && npm prune --production

ENV PORT 3000

EXPOSE 3000

CMD ["node", "build"]