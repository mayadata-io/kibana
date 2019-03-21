def ORG = "mayadataio"
def REPO = "kibana"
def BRANCH_NAME = BRANCH_NAME.toLowerCase()
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
                set -e
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
            #    nvm install v8.11.4         # first time only
            #    set +x
                nvm use 8.11.4              # Use nvm v8.11.4 version

            #    nvm ls
            #   [ -s "$NVM_DIR/nvm.sh" ]
            #   "$NVM_DIR/nvm.sh"

                nvm --version 
                which node
            #   nvm use 8.11.4
                node -v
                npm -v
                nvm --version
                yarn -v
                
                 yarn kbn bootstrap
                 yarn build --skip-os-packages
                  tree |grep npmtest
                    
                sh(returnStdout: true, script: "mv /var/lib/jenkins/workspace/npmtest/target/  $HOME/kibana-build")


               
        #    mv /var/lib/jenkins/workspace/npmtest/target/  $HOME/kibana-build
        #    sh ' mv '/var/lib/jenkins/workspace/npmtest/target/'*  $HOME/kibana-build/ '
        #    sh(returnStdout: true, script: "mv /var/lib/jenkins/workspace/npmtest/target/  $HOME/kibana-build")
        #    mv /var/lib/jenkins/workspace/npmtest/target/  $HOME/kibana-build

                '''
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