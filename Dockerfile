FROM nodemon:3

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ./package.json /server
COPY ./package-lock.json /server

RUN nodemon server/server
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /backend

EXPOSE 5002