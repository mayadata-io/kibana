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
    stages {
      stage('create kibana-build dir'){
        steps {
            sh ''' 
                set -xe
                if ( -d "$HOME/kibana-build" );
                then
                    echo "Kibana-build exits";
                    rm -r $HOME/kibana-build;
                    echo "Removed old build"
                fi
                
                if ( ! -d "$HOME/kibana-build" );
                then
                    echo "Create kibana-build dir";
                    mkdir -p $HOME/kibana-build
                fi
                echo $PATH
                pwd 
                ls
                echo $HOME
                which node
                nvm use 8.11.4
                node -v
                npm -v
                yarn -v
                nvm --version
                yarn kbn bootstrap
                yarn build --skip-os-packages
                mv /var/lib/jenkins/workspace/npmtest/target/ $HOME/kibana-build 
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