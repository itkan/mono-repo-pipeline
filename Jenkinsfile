pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/itkan/node-web-service.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('your/docker-image:latest')
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://your-docker-registry.com', 'your-docker-credentials') {
                        docker.image('your/docker-image:latest').push('latest')
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                kubernetesDeploy(
                    kubeconfigId: 'your-kubeconfig-credentials',
                    configs: 'deployment.yaml',
                    enableConfigSubstitution: true
                )
            }
        }
    }
}
