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
                sh 'docker build -t frontend .'
                sh 'docker run -d -p 80:80 frontend'
            }
        }
    }
}