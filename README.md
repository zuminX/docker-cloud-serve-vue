[TOC]



# 项目介绍

这是共享应用项目的用户前端工程，采用Vue开发。



## 项目技术栈

1. vue
2. semanticUI
3. elementUI
4. jquery
5. axios
6. vue-router
7. vuex
8. vue-cli3
9. ...



# 快速部署

1. 克隆前端项目到本地
2. 进入到前端项目根目录中，在命令行依次输入如下命令

```
# 安装依赖
npm install
# 在localhost:8080启动项目
npm run serve
```

- 由于在项目中已经设置了端口转发，将数据转发到后端，因此项目启动之后，在浏览器中输入 `http://localhost:8080` 就可以访到前端项目（必须启动Spring Boot项目）

3. 修改完后，进入到根目录中，然后执行`npm run build`进行构建该项目
4. 该命令执行成功之后，根目录下会·生成一个`dist`文件夹，将该文件夹中所有文件复制到Spring Boot项目中`resources/static/`目录下，然后就可以启动Spring Boot项目进行访问了
