## 说明

利用 koa2 定期爬取 https://bing.ioliu.cn/ 页面图片，上传到自己图床。前端 react 做简单展示。

源地址图片格式: 800x480 1920x1080

### 项目启动

前端:

- npm start: 开发启动
- npm run build: 打包

后端: npm run server

```bash
pm2 start ecosystem.json --env production
pm2 startOrRestart ecosystem.json --env production
# 远程部署
pm2 deploy ecosystem.json production setup # 初始化
pm2 deploy ecosystem.json production # 启动项目
```
