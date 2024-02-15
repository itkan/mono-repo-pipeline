# delete the existing container
docker rm -f registry-configured

#run new container
docker run -d -p 5000:5000 \
    --restart=always \
    --name registry-configured \
    --volumes-from docker-registry-storage \
    -v docker-registry-storage:/var/lib/registry \
    registry:latest