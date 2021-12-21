FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

# Install PM2 globally
RUN npm install --global pm2
RUN yarn

COPY . .

EXPOSE 5000

CMD [ "yarn", "start" ] 