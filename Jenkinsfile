pipeline{
    agent any
    stages{
        stage('hello'){
            steps{
                sh 'echo hello'
            }
        }
        stage('Docker Build'){
            steps{
                sh 'sudo docker build -t frontend .'
                sh 'sudo docker run -d -p 80:80 frontend'
            }
        }
    }
}