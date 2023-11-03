pipeline{
    agent any
    stages{
        stage('hello'){
            steps{
                sh 'echo hello1234'
            }
        }
        stage('Docker Build'){
            steps{
                sh 'sudo docker build -t frontend .'
                
            }
        }
        stage('Deploy Docker Image') {
            steps {
                script {
                 withCredentials([string(credentialsId: 'docker-hub-creds', variable: 'docker-hub-creds')]) {
                    sh 'docker login -u raja2304 -p ${docker-hub-creds}'
                 }  
                 sh 'docker push frontend'
                }
            }
        }
    }
}