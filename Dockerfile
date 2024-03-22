FROM node:18.14.0

WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
CMD npm start