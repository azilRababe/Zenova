# Pull the Node image from Docker Hub
FROM node:12.4.0-alpine

RUN npm install -g nodemon 

# Setting Working Directory
WORKDIR /app/backend

# Copying only package.json
COPY package*.json ./

# Install Dependencies
RUN npm install

RUN npm install @babel/node --save-dev

# Copy rest of the code to container
COPY . .

# Copy the .babelrc file to the container
COPY .babelrc ./

EXPOSE 8080

# Run the API on Nodemon
CMD ["npm", "start"] 
