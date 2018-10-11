FROM node:8

# set domestic npm package management source
RUN npm config set registry https://registry.npm.taobao.org

EXPOSE 3000
