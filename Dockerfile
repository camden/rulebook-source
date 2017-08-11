# Create image based on the official Node 8 image from the dockerhub
FROM node:8

# Set up our env variables
ENV workdir /usr/rulebook-source

# Create a directory where our app will be placed
RUN mkdir -p ${workdir}

# Change directory so that our commands run inside this new directory
WORKDIR ${workdir}

# Copy dependency definitions
COPY package.json ${workdir}

# Install dependencies
RUN yarn install --production

# Get all the code needed to run the app
COPY . ${workdir}

# Serve the app
CMD ["yarn", "start"]
