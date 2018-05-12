图片格式: 800x480 1920x1080

### 项目启动

前端: npm start

后端: npm run server

```bash
pm2 start ecosystem.json --env production
pm2 startOrRestart ecosystem.json --env production
# 远程部署
pm2 deploy ecosystem.json production setup # 初始化
pm2 deploy ecosystem.json production # 启动项目
```

```bash
db.createUser({user: 'runner', pwd: 'pwd', roles: [{role: 'readWrite', db: 'lunwen'}]})
```