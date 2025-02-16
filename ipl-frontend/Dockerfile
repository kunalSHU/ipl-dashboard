FROM node:23.7.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

# Install dependencies (including react-scripts locally)
RUN npm install --ignore-scripts

COPY . ./

CMD ["npm", "start"]
