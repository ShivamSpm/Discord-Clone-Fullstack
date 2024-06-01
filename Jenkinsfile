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
                    withAWS(credentials: 'aws-ecr-credentials', region: "${AWS_REGION}") {
                        docker.withRegistry("https://${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com") {
                            def app = docker.build("${DOCKER_IMAGE}")
                            app.push()
                        }
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
                    withAWS(credentials: 'aws-ecr-credentials', region: "${AWS_REGION}") {
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
