pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = '905418225867'
        AWS_REGION = 'us-east-2'
        ECR_REPO_NAME = 'discord-clone'
        ECS_CLUSTER_NAME = 'discord-clone'
        ECS_SERVICE_NAME = 'discord-clone-service'
        DOCKER_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${env.BUILD_ID}"
        DATABASE_URL = 'your-database-url'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'aws-ecr-credentials', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                        sh '''
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        docker build -t ${DOCKER_IMAGE} .
                        docker push ${DOCKER_IMAGE}
                        '''
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    docker.image("${DOCKER_IMAGE}").inside {
                        sh 'npm install'
                        sh 'npm run test'
                    }
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'aws-ecr-credentials', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                        sh '''
                        aws ecs update-service --cluster ${ECS_CLUSTER_NAME} --service ${ECS_SERVICE_NAME} --force-new-deployment
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
