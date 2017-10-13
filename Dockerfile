FROM node:8.2.1-slim
MAINTAINER bsxian

RUN useradd --user-group --create-home --shell /bin/false app

EXPOSE 20000:20000
ENV NODE_ENV=production
ENV HOME=/home/app

USER root

RUN  npm install pm2 -g
COPY config.js package.json npm-shrinkwrap.json $HOME/security/
ADD  ./server $HOME/security/server

WORKDIR $HOME/security
RUN npm install
RUN chown -R app:app $HOME/*

USER app

