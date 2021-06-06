FROM node:16 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV NODE_ENV production
ENV PORT 80

EXPOSE ${PORT}

CMD ["npm", "run", "prod"]