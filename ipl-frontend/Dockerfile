FROM node:23.7.0-alpine

WORKDIR /app

# Use ARG to declare a build-time variable
ARG NODE_OPTIONS

# Use ENV to set the environment variable inside the container
ENV NODE_OPTIONS=${NODE_OPTIONS}
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

# Install dependencies (including react-scripts locally)
RUN npm install --ignore-scripts

COPY . ./

CMD ["npm", "start"]
