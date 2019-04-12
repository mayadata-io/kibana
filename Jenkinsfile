def ORG = "mayadataio"
def REPO = "kibana"
def BRANCH_NAME = BRANCH_NAME.toLowerCase()
def DOCKER_HUB_REPO = "https://index.docker.io/v1/"
def DOCKER_IMAGE = ""
  pipeline {
    agent {
      label {
        label ""
          customWorkspace "/var/lib/jenkins/workspace/${REPO}-${BRANCH_NAME}"
      }
    }
         environment {                                  
                NVM_DIR="$HOME/.nvm"                                                                                                                                        
         }
    stages {
      stage('create kibana-build dir'){
        steps {
            sh ''' 
                set -x
                if [ -d "$HOME/kibana-build" ];
                then
                    echo "Kibana-build exits";
                    rm -r $HOME/kibana-build;
                    echo "Removed old build"
                fi
                
                if [! -d "$HOME/kibana-build" ];
                then
                    echo "Create kibana-build dir";
                    mkdir -p $HOME/kibana-build
                fi

                echo $PATH
                pwd 
                ls
                echo $HOME  
            #   curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash   
            #   wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
               [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
            
            #   export NVM_DIR="$HOME/.nvm" # set local path to NVM
            #   nvm install v8.11.4         # first time only
                nvm use 8.11.4              # Use nvm v8.11.4 version
                nvm ls
            #   [ -s "$NVM_DIR/nvm.sh" ]
            #   "$NVM_DIR/nvm.sh"

                nvm --version 
                which node
                node -v
                npm -v
                nvm --version
                yarn -v
                
            #    yarn kbn bootstrap
             #   yarn build --skip-os-packages
                 
        #   sh(returnStdout: true, script: "mv /var/lib/jenkins/workspace/npmtest/target/$Test   $HOME/kibana-build")
            mv /var/lib/jenkins/workspace/kibana-kibana_jenkinsfile/target/$Test  $HOME/kibana-build/   
             '''
            }
        }
        stage ('Build'){
            steps{
                script{
                       	 GIT_SHA = sh(
		                 returnStdout: true,
				 script: "git log -n 1 --pretty=format:'%h'"
				).trim()

		    sh 'env > env.txt'
		    for (String i : readFile('env.txt').split("\r?\n")) {
		        println i
		    }

                    if (env.BRANCH_NAME == 'kibana_jenkinsfile'){
                        echo "Starting build for ${env.BRANCH_NAME} branch"
                        DOCKER_IMAGE = docker.build("${ORG}/${REPO}:${env.BRANCH_NAME}-${GIT_SHA}") 

                    }
                }
            }
        }

    }
  
    post{
        always{
            echo "This will always run"
        }
        success{
            echo "This will run only if successful"
        }
        failure{
            echo "This will run only if failed"
        }
    }
  }
    