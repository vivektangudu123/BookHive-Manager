FROM node:21

# Create app directory
WORKDIR /client

# Install app dependencies
COPY ./package.json ./client
COPY ./package-lock.json ./client

RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /client

EXPOSE 3000
CMD [ "npm", "start" ]