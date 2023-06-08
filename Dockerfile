FROM ubuntu:20.04

# MAINTAINER SJ Chen

RUN apt-get update  
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata. 

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

ENV CODE_DIR /home/trend_lite_next/
RUN /bin/bash -c "mkdir $CODE_DIR"


# Cypress
# RUN echo "y" | apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
RUN apt-get install -y --force-yes -q \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    # should echo geographic area
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
# RUN /bin/bash -c "cd /home/trend_lite_next/ && npm i && ./node_modules/.bin/cypress install"
# RUN apt install fonts-wqy-zenhei


CMD [\
    "cd /home/trend_lite_next/",\
    # "npm i",\
    # "./node_modules/.bin/cypress install",\
    ]


# docker build -t u20n16 ./
# docker run -it -v $(pwd):/home/trend_lite_next -p 4500:4500 u20n16 bin/bash 
# cd /home/trend_lite_next/
# npm i
# ./node_modules/.bin/cypress install
# npm run dev
# npm run e2e


