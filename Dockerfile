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

CMD [\
    "cd /home/trend_lite_next/",\
    "npm i",\
    # "npm run dev",\
    ]


# docker build -t u22n16 ./
# docker run -it -v $(pwd):/home/trend_lite_next -p 4500:4500 u22n16 bin/bash 
# cd /home/trend_lite_next/
# npm i
# npm run dev


