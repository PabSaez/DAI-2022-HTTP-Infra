FROM node:18.12.1

COPY ./src /opt/app

WORKDIR /opt/app

RUN npm install

EXPOSE 8082

CMD ["node", "/opt/app/index.js"]