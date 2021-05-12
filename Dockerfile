FROM node:12 as builder

ARG api_url

ENV REACT_APP_API_URL=$api_url

ENV SKIP_PREFLIGHT_CHECK=true

WORKDIR /app

COPY . .

RUN yarn install && yarn build

FROM nginx:1.20.0-alpine

RUN rm -rf /etc/nginx/conf.d

RUN mkdir -p /etc/nginx/conf.d

COPY ./default.conf /etc/nginx/conf.d/

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]