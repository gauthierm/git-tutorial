pipeline {
  agent any

  stages {
    stage ('install') {
      sh 'yarn install'
    }

    stage ('lint') {
      sh 'yarn lint'
    }

    stage ('build') {
      sh 'yarn build'
    }
  }
}
