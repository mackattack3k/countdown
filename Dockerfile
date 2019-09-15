# base image
FROM node:12-stretch-slim as build-deps
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN yarn install --silent
RUN yarn build

# Serve from nginx webserver
FROM node:12-stretch-slim as run-server
WORKDIR /countdown
COPY --from=build-deps /app/build .
RUN yarn global add serve
EXPOSE 3000
CMD ["serve", "-s", "."]
