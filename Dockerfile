FROM node:10 AS node-builder
WORKDIR /src/webapp
COPY . .
RUN npm install
RUN npm run webpack:prod

FROM nginx:1.15.2-alpine
COPY .htaccess /target/classes/static
COPY /target/classes/static /usr/share/nginx/html
COPY nginx.site.template /etc/nginx/conf.d/
CMD envsubst '${BACKEND_URI}' < /etc/nginx/conf.d/nginx.site.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'