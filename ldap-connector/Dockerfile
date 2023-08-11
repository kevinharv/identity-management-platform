# Define base image
ARG NODE_VERSION=18.17.0
FROM node:${NODE_VERSION}-alpine3.18

COPY . .
RUN yarn
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]