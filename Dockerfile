# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Install the NestJS CLI
RUN npm i -g @nestjs/cli

# Copy the rest of the application code to the working directory
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# # Expose the port on which the NestJS app will run
EXPOSE 3001

# # Start the NestJS app
CMD [ "npm", "run", "start:prod" ]
