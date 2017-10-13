#!/bin/bash

sudo docker build -t bs_sec ./
sudo docker save bs_sec>bs_sec.tar