FROM node:21

# Create app directory
WORKDIR /app
RUN npm install -g nodemon
# Install app dependencies
COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /app
EXPOSE 5002


# Run nodemon to start your server
CMD ["nodemon", "server"]
