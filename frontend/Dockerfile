# Pull the Node image from Docker Hub
FROM node:12.4.0-alpine

# Setting Working Directory
WORKDIR /app/frontend

# Copying only package.json
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy rest of the code to container
COPY . .

EXPOSE 3000

# Run the React app
CMD ["npm","run" ,"start"]