# FROM nodemon:3

# # Create app directory
# WORKDIR /app

# # Install app dependencies
# COPY ./package.json /server
# COPY ./package-lock.json /server

# RUN nodemon server/server
# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
# COPY . /backend

# EXPOSE 5002
# Use an official Node.js runtime as a base image
FROM node:14

# Create app directory
WORKDIR /app

# Install nodemon globally
RUN npm install -g nodemon

# Install app dependencies
COPY package.json package-lock.json /server/
RUN cd /server && npm install

# Bundle app source
COPY . /backend

EXPOSE 5002

# Run nodemon to start your server
CMD ["nodemon", "server"]
