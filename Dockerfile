
FROM node:lts-alpine3.20
#作者
LABEL key="yzl"


RUN mkdir -p /project\
    && mkdir -p /project/resource/logs\
    && mkdir -p /project/resource/logs/pm2\
    && mkdir -p /project/resource/logs/application\
    && mkdir -p /project/resource/config

#指定工作目录
WORKDIR /project/dist/

#将dist目录拷贝到镜像里
COPY ./dist package.json pm2.json yarn.lock ./

#执行命令:安装依赖
RUN  yarn global add pm2 \
    && yarn install --production\
    && yarn cache clean


#配置环境变量
ENV HOST=0.0.0.0
ENV TZ=Asia/Shanghai

#定义程序默认端口
EXPOSE 3000

#运行程序命令
CMD [ "pm2-runtime", "start","pm2.json"]
