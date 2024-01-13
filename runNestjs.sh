#!/bin/bash

# Install the app dependencies
npm install

# Install the NestJS CLI
npm i -g @nestjs/cli

# Build the Prisma client
npx prisma generate

# For development
# npm run start:dev

# Creates a "dist" folder with the production build
npm run build

# For production
npm run start:prod