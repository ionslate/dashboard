FROM node:12 as builder

ENV SKIP_PREFLIGHT_CHECK=true

WORKDIR /app

COPY . .

RUN yarn install && yarn build

FROM nginx:1.20.0-alpine

RUN rm -rf /etc/nginx/conf.d

RUN mkdir -p /etc/nginx/conf.d

RUN mkdir -p /etc/nginx/templates

COPY ./default.conf.template /etc/nginx/templates

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

COPY docker-entrypoint.sh /

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]