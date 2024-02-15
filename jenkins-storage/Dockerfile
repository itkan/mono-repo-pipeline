# Use a base image (e.g., Ubuntu) for creating the storage container
FROM ubuntu:latest

# Create a directory to store Jenkins workspace and other files
RUN mkdir -p /var/jenkins_home

# Set the directory as a volume to persist data
VOLUME /var/jenkins_home

# Add a user with the desired UID and GID
ARG USER_ID=1000
ARG GROUP_ID=1000
RUN groupadd -g ${GROUP_ID} jenkins && \
    useradd -d /var/jenkins_home -u ${USER_ID} -g ${GROUP_ID} -s /bin/bash jenkins

# Set permissions for the Jenkins user
RUN chown -R jenkins:jenkins /var/jenkins_home

# Switch to the Jenkins user
USER jenkins

# Create a dummy file and tail it to keep the container running indefinitely
CMD touch /var/jenkins_home/keep_running && tail -f /var/jenkins_home/keep_running
