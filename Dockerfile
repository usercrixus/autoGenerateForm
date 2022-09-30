# syntax=docker/dockerfile:1

FROM node:16
# set working directory
WORKDIR /app

# Copies everything over to Docker environment
COPY . .

# Install `serve` to run the application.
RUN npm install -g serve

# Run application
#CMD [ "npm", "start" ]
CMD serve -s build