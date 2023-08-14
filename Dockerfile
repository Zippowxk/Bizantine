# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy the rest of the application into the image
COPY . .

RUN npm install -g pnpm

RUN pnpm install

# Define the port the app runs on
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "start-server" ]
