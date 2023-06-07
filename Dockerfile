FROM ubuntu
# MAINTAINER SJ Chen

RUN apt update

RUN apt install nodejs -y
RUN apt install npm -y

# NVM
RUN apt-get install build-essential libssl-dev
RUN apt install curl -y
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN source ~/.profile
RUN nvm install 16

