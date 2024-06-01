# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY .env ./

# Install dependencies
RUN npm install

RUN npx prisma generate

# Copy the rest of the application code
COPY . .

RUN npx prisma db push

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

CMD ["npm", "start"]
