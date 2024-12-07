FROM node AS builder

RUN mkdir -p /app
WORKDIR /app
ADD . .
RUN mkdir -p video-storage

RUN npm install --legacy-peer-deps
RUN npm run build

CMD ["sh", "-c", "npx typeorm-ts-node-commonjs migration:run -d ./src/database/data-source.ts && npm run start:prod"]