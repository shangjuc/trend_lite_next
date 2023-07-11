FROM ubuntu:20.04

# MAINTAINER SJ Chen

RUN apt-get update  
# RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata. 
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections


# Install Nvm 
RUN echo "y" | apt-get install curl
RUN mkdir -p /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v16.20.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH
RUN /bin/bash -c "$NODE_PATH/npm -v"

ENV CODE_DIR /app
RUN /bin/bash -c "mkdir $CODE_DIR"


# Cypress
# RUN /bin/bash -c "npx cypress install --force"
# RUN /bin/bash -c "cd /app && npm install cypress@12.13.0 --save-dev && ./node_modules/.bin/cypress install"
RUN apt-get install -y --force-yes -q \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    # libnotify-dev \
# libnotify-dev should echo geographic area
    libgconf-2-4 \ 
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb

# RUN echo "y" | apt install wget
# RUN cd /home && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

RUN apt-get install -y firefox
RUN apt-get install -y fonts-wqy-zenhei
# RUN apt install fonts-wqy-zenhei
RUN apt-get install -y --force-yes -q \
    libnotify-dev 
RUN /bin/bash -c "cd /app && npm install cypress@12.13.0 --save-dev && ./node_modules/.bin/cypress install"


CMD [\
    # "cd /app",\
    # "npm i",\
    # "./node_modules/.bin/cypress install",\
    ]


# docker build -t e2e_v7 -f ./dockerfiles/Dockerfile_e2e_v7 .
# docker run -it -v $(pwd):/app -p 4500:4500 e2e_v4 bin/bash 
# cd /app
# npm i
# ./node_modules/.bin/cypress install
# npm run e2e


