docker rmi -f jenkins-configured
docker rm -f jenkins-configured
docker build \
  --progress=plain \
  --build-arg GITHUB_USERNAME=itkan \
  --build-arg GITHUB_PASSWORD=****** \
  --build-arg POSTGRES_USERNAME=postgres \
  --build-arg POSTGRES_PASSWORD=****** \
  -t jenkins-configured .

docker run -d -p 2020:8080 \
    --restart=always \
    --name jenkins-configured --volumes-from jenkins-storage \
    -u $(docker inspect --format='{{.Config.User}}' jenkins-storage) \
    -v /var/run/docker.sock:/var/run/docker.sock \
    jenkins-configured
