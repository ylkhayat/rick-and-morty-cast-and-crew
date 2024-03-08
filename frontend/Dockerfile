FROM node:18-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND yarn.lock are copied.
# Copying this separately prevents re-running yarn install on every code change.
COPY package*.json yarn.lock ./

# Install production dependencies.
RUN yarn install

# Copy local code to the container image.
COPY . ./

# Expose the port the app runs in
EXPOSE 3000

# Run the web service on container startup.
CMD [ "yarn", "start" ]
