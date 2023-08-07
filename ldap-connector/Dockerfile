# Define base image
ARG NODE_VERSION=18.17.0
FROM node:${NODE_VERSION}-alpine3.18

COPY . .
RUN yarn

EXPOSE 3000
CMD ["yarn dev"]