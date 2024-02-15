FROM node:18.16.0-alpine3.17
WORKDIR /app
COPY src/ .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start"]
