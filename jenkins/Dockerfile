# Use the official Jenkins image as the base image
FROM jenkins/jenkins:lts

# set environment variables
ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false
ENV JENKINS_HOME /var/jenkins_home

# Install jenkins-plugin-cli for downloading given list of plugins
USER root
RUN apt-get update && apt-get install -y curl && \
    curl -L https://github.com/jenkinsci/plugin-installation-manager-tool/releases/download/2.12.14/jenkins-plugin-manager-2.12.14.jar \
    --output /usr/share/jenkins/jenkins-plugin-manager.jar

#install docker client
RUN curl -sSL https://get.docker.com/ | sh 

# add jenkins user to docker to enable jenkins to use the docker client
RUN usermod -a -G docker jenkins

# Copy required files for initialization
# there can be more configs that can be added here, to keep all config as code
COPY credentials.xml /usr/share/jenkins/ref/credentials.xml

# Install plugins using jenkins-plugin-cli
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN java -jar /usr/share/jenkins/jenkins-plugin-manager.jar --plugin-file /usr/share/jenkins/ref/plugins.txt

# Expose Jenkins port
EXPOSE 8080

# Skip the first-time setup wizard
RUN echo 2.0 > /usr/share/jenkins/ref/jenkins.install.UpgradeWizard.state
RUN echo 2.0 > /usr/share/jenkins/ref/jenkins.install.InstallUtil.lastExecVersion

# Update all existing plugins
USER jenkins
RUN java -jar /usr/share/jenkins/jenkins-plugin-manager.jar --list --available-updates --clean-download-directory
RUN java -jar /usr/share/jenkins/jenkins-plugin-manager.jar --latest | true

# Start Jenkins as the entrypoint
ENTRYPOINT ["tini", "--", "/usr/local/bin/jenkins.sh"]
