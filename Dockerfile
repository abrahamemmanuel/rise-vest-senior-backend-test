FROM node:18.14.0

# Create a directory for the app
WORKDIR /app/src

# Copy package.json and package-lock.json files
COPY package*.json ./
COPY tsconfig.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Set the environment variable for running the application
ENV NODE_ENV=production

# Build the TypeScript code
RUN npm run build

# Start the application
CMD ["npm", "run", "start"]
