# WARNING: this file was autogenerated by generate-browser-image.js
# using
#   yarn add:browser -- 16.16.0 --chrome=107.0.5304.121 --firefox=107.0 --edge
set e+x

LOCAL_NAME=cypress/browsers:node16.16.0-chrome107-ff107-edge
echo "Building $LOCAL_NAME"
docker build -t $LOCAL_NAME .