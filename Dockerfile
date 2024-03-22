FROM node:18.14.0

WORKDIR /src
COPY tsconfig.json .
COPY package.json .
RUN npm install
COPY . .
CMD npm start