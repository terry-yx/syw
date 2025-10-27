# 使用官方的Nginx镜像作为基础镜像
FROM nginx:alpine
 
# 移除默认的Nginx配置文件
RUN rm /etc/nginx/conf.d/default.conf
 
# 复制自定义的Nginx配置文件到容器中的指定位置
COPY nginx.conf /etc/nginx/conf.d/
 
# 复制前端构建的静态文件到容器中的Nginx服务器目录
COPY ./ /usr/share/nginx/html
 
# 暴露80端口
EXPOSE 80
 
# 启动Nginx服务器
CMD ["nginx", "-g", "daemon off;"]