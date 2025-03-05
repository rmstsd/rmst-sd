FROM node:18-alpine AS base
WORKDIR /app

EXPOSE 3700

COPY .n .
COPY package.json .
COPY package-lock.json .

RUN node -v

RUN npm install

COPY main.js .

ENTRYPOINT ["node"]
CMD ["main.js"]