docker rm -f node-web-service
docker rmi -f node-web-service
docker build -t node-web-service .
docker run -d -p 3000:3000 --name node-web-service node-web-service