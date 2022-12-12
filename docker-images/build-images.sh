#!/bin/bash

# Build dynamic web container
docker build --tag hugoducom/node-invoices ./node-express-image

# Build static web container
docker build --tag hugoducom/httpd-static ./apache-php-image