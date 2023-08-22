FROM node:18-alpine as builder
WORKDIR /react
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /react/build/ /usr/share/nginx/html
COPY --from=builder /react/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]