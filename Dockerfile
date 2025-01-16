# Use official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the development port
EXPOSE 3000

# Disable Next.js telemetry
RUN npx next telemetry disable

# Start the Next.js app in development mode
CMD ["npm", "run", "dev", "--watch"]
