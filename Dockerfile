# yiru
#
# VERSION 1.0.0

# 国内源
FROM daocloud.io/node:7

MAINTAINER ah.yiru@gmail.com

ENV HTTP_PORT 8000

COPY . /app
WORKDIR /app

RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 8000

CMD ["npm","start"]

############################################

# yiru
# VERSION 2.0.0

# 停止 docker stop statusbarcontainer  
# 重启容器 docker restart statusbarcontainer  
# 删除容器 docker rm statusbarcontainer 
# Running docker build -t myapp .

FROM nodesource/node:7

RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app

COPY . /home/nodejs/app
RUN npm install --production

CMD ["node", "index.js"]