pipeline {
  agent any
  stages {
    stage('Version Update') {
        steps {
           echo "Workspace dir is ${pwd()}"
           script {
             if (env.BRANCH_NAME == 'mo-kibana'){
                  BN = sh(
                    returnStdout: true,
                    script: "./version_override ${REPO}"
                  ).trim()
                echo "${BN}"
                echo "This image will be tagged with ${BN}"
              }else {
                GIT_SHA = sh(
		                 returnStdout: true,
				             script: "git log -n 1 --pretty=format:'%h'"
				           ).trim()
              } 
           }
        }
      }
    stage(‘build’) {
      steps {
         nodejs(nodeJSInstallationName: 'node') {
             sh """
           if (env.BRANCH_NAME == 'staging-mo-kibana' || env.BRANCH_NAME == 'mo-kibana' || env.BRANCH_NAME.startsWith('alpha-r')) {             
                if [ -d "$HOME/kibana-build/${env.BRANCH_NAME}" ];
                then
                  echo "kibana-build exits";
                  rm -r $HOME/kibana-build/*;
                  echo "removed old build"
                fi
                
                if [ ! -d "$HOME/kibana-build/${env.BRANCH_NAME}" ];
                then
                  echo "create kibana-build dir";
                  mkdir -p $HOME/kibana-build/${env.BRANCH_NAME}
                fi

                node -v
                npm -v
                yarn -v
                yarn kbn bootstrap
                yarn build --skip-os-packages
                mv /var/lib/jenkins/workspace/npmtest/target/ $HOME/kibana-build/${env.BRANCH_NAME}/
          } else {
               yarn kbn bootstrap
               yarn build --skip-os-packages
               
             } 
             """ 
            }
          script {    
            echo "INFO: TRIGGER DOWNSTREAM BUILD FOR KIBANA-DOCKER, of branch=${env.BRANCH_NAME}"
            BUILD_JOB = sh (script: "echo ../kibana-docker/${env.BRANCH_NAME}", returnStdout: true).trim()
            build job: "${BUILD_JOB}", propagate: true, quietPeriod: 2,  wait: true     
          }
        }        
      }
    stage ('Adding git-tag for master') {
        steps {
          script {
             if (env.BRANCH_NAME == 'mo-kibana') {
               sh """
                git tag -fa "${BN}" -m "Release of ${BN}"
                """
                sh "git tag -l"
                sh """
                  git push https://${env.user}:${env.pass}@github.com/mayadata-io/maya-io-server.git --tag
                   """
             }
          }
        }
      }
    stage ('Adding tag to file for downstream') {
        steps {
          script {
             if (env.BRANCH_NAME == 'mo-kibana') {
                sh(returnStdout: true, script: "echo ${BN} > $HOME/kibana-build/${env.BRANCH_NAME}/ver")
             } else (env.BRANCH_NAME == 'mo-kibana') {
             sh(returnStdout: true, script: "echo ${GIT_SHA} > $HOME/kibana-build/${env.BRANCH_NAME}/ver")
             }  
          }
        }
      } 
   }     
      post {
        always {
            echo 'This will always run'
            deleteDir()
        }
        success {
            echo 'This will run only if successful'
            /*slackSend channel: '#maya-io',
                   color: 'good',
                   message: "The pipeline ${currentBuild.fullDisplayName} completed successfully :dance: :thumbsup: "
            */
	}
        failure {
            echo 'This will run only if failed'
            slackSend channel: '#maya-io',
                  color: 'RED',
                  message: "The pipeline ${currentBuild.fullDisplayName} failed. :scream_cat: :japanese_goblin: "

        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
            slackSend channel: '#maya-io',
                   color: 'good',
                   message: "The pipeline ${currentBuild.fullDisplayName} is unstable :scream_cat: :japanese_goblin: "

	}
        changed {
/*            slackSend channel: '#maya-io',
                   color: 'good',
                   message: "Build ${currentBuild.fullDisplayName} is now stable :dance: :thumbsup: "
            echo 'This will run only if the state of the Pipeline has changed'
*/            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
