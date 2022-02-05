#stage 1
FROM node:14-alpine as node
WORKDIR /app

COPY package.json /app
RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/AngularProject /usr/share/nginx/html