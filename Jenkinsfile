pipeline{
    agent any
    stages{
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
                 sh 'docker tag frontend raja2304/node-frontend:1' 
                 sh 'docker push raja2304/node-frontend:1'
                }
            }
        }
        stage("Pull Docker image"){
            steps{
                sh 'docker run -itd -p 81:80 raja2304/node-frontend:1'
            }
        }
    }
}