#!/bin/bash

# Install the app dependencies
npm install

# Install the NestJS CLI
npm i -g @nestjs/cli

# Build the Prisma client
npx prisma generate

# For development
# npm run start:dev

# For production
npm run start