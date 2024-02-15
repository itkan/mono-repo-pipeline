# Use a base image (e.g., Ubuntu) for creating the storage container
FROM ubuntu:latest

# Create a directory to store Jenkins workspace and other files
RUN mkdir -p /var/docker

# Set the directory as a volume to persist data
VOLUME /var/docker

# open access
RUN chmod -R 777 /var/docker

# Create a dummy file and tail it to keep the container running indefinitely
CMD touch /var/docker/keep_running && tail -f /var/docker/keep_running
