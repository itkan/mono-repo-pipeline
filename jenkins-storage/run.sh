docker rm -f jenkins-storage
docker rmi -f jenkins-storage
docker build -t jenkins-storage .
docker run -d --restart=always --name jenkins-storage jenkins-storage

