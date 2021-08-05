FROM nginx:latest
COPY ./docker/nginx.conf /etc/nginx
COPY ./storybook-static/ /usr/share/nginx/html/
EXPOSE 80
