FROM ubuntu
# MAINTAINER SJ Chen

RUN apt-get update  
    # && apt-get install -y -q \
    # build-essential \ 
    # curl \ 
    # git \
    # libssl-dev 

RUN echo "y" | apt-get install curl

RUN mkdir -p /usr/local/nvm

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v16

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH
# RUN npm -v
# RUN node -v


# RUN apt install nodejs -y
# RUN apt install npm -y

# NVM
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


