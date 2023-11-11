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
                 withCredentials([string(credentialsId: 'docker', variable: 'docker')]) {
                    sh 'docker login -u raja2304 -p ${docker}'
                 }  
                 sh 'docker push raja2304/node-frontend:1'
                }
            }
        }
    }
}