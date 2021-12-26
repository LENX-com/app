FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

RUN cd etc && mkdir -p /ssl
# Copy config files
# *.conf files in "conf.d/" dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/
COPY ./cert.pem /etc/ssl/cert.pem
COPY ./key.pem /etc/ssl/key.pem
COPY ./client-cert.pem /etc/ssl/client-cert.pem


# Expose the listening port
EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]     