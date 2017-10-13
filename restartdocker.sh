#!/bin/bash

dflag="/?"

if [ -z $1 ]
then
  echo run docker with output to console
elif [ $dflag=$1 ]
then
  echo restartdocker /?    usage help
  echo restartdocker -d    run as daemon
  exit 1
fi

sudo docker stop bs_sec_1
sudo docker rm bs_sec_1

#sudo docker run $1 -t -i -p 20000:20000 --name bs_sec_1 bs_sec
docker run -t -i -p 20000:20000 --env MONGODB_URI=mongodb://172.17.0.1:27016/bs-security  --name bs_sec_1 bs_sec npm run start