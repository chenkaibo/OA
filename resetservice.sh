#!/bin/bash

if [ -z $1 ]; then
  echo resetservice  /?    usage help
  echo resetservice  imagefile   reset with docker image file
  exit 1
fi

sudo docker stop bs_sec_1
sudo docker rmi bs_sec
#tar -xvf $1 bs_sec.tar
sudo docker load -i $1