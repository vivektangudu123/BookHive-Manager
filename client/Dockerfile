FROM node:21

# Create app directory
WORKDIR /client

RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /app

EXPOSE 3000
CMD [ "npm", "start" ]