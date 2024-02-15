docker rm -f docker-registry-storage
docker rmi -f docker-registry-storage
docker build -t docker-registry-storage .
docker run -d --restart=always --name docker-registry-storage docker-registry-storage

