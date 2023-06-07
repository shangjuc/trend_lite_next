FROM ubuntu

# MAINTAINER SJ Chen

RUN apt-get update  
RUN echo "y" | apt-get install curl

RUN mkdir -p /usr/local/nvm

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v16

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH

# docker build -t u22_node16 ./
# docker run -it -v $(pwd):/home/trend_lite_next -p 4500:4500 u22_node16 bin/bash 
# cd /home/trend_lite_next/
# npm i
# npm run dev

# RUN npm -v
# RUN node -v

# RUN apt update  
    # && apt-get install -y -q \
    # build-essential \ 
    # curl \ 
    # git \
    # libssl-dev 

# RUN apt install nodejs -y
# RUN apt install npm -y

# SHELL ["/bin/bash", "--login", "-i", "-c"]
# ENV NVM_DIR ~/.nvm 
# ENV NVM_DIR /usr/local/nvm 
# or ~/.nvm , depending
# ENV NODE_VERSION 16

# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash \
#     && . $NVM_DIR/nvm.sh \
#     && nvm install $NODE_VERSION

# RUN source /root/.bashrc && nvm install 16
# SHELL ["/bin/bash", "--login", "-c"]
# RUN source ~/.profile
# RUN source ~/.bashrc
# RUN source ~/.nvm/nvm.sh
# RUN nvm install 16


