#!/bin/bash

# 请先在 GitHub 创建一个空仓库，然后把地址填在这里
# 例如: REPO_URL="https://github.com/YourUsername/blog.git"
echo "请输入你的 GitHub 仓库地址 (HTTPS):"
read REPO_URL

# 初始化 Git
git init
git branch -M main

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Novatra AI Blog v1.0 (Astro + React + Tailwind)"

# 关联远程并推送
git remote add origin $REPO_URL
echo "正在推送到 GitHub... (可能需要输入账号密码/Token)"
git push -u origin main --force

echo "✅ 推送完成！请前往 GitHub 仓库 -> Settings -> Pages 查看部署状态。"
