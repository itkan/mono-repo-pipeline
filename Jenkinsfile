pipeline {
    agent any
    stages {
        stage('Checkout') {
            git url: 'https://github.com/itkan/node-web-service.git'
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('itkan/node-web-service:latest')
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: '9e191ea4-ca75-43e5-9922-6b2a4cdb9556', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                    script {
                        docker.withRegistry('https://hub.docker.com', '9e191ea4-ca75-43e5-9922-6b2a4cdb9556') {
                            docker.image('itkan/node-web-service:latest').push('latest')
                        }
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
