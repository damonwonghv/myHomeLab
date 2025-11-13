# ============================================================================
# Dockerfile Overview
# ============================================================================
# 此 Dockerfile 用於將 myHomeLab Dashboard 應用程式打包成 Docker 映像檔
# 
# 功能說明：
# 1. 使用 nginx:alpine 作為基礎映像檔（輕量級 Web 伺服器）
# 2. 將建置後的靜態檔案（dist 目錄）複製到 nginx 的網頁根目錄
# 3. 暴露 8081 端口供外部存取
# 4. 啟動 nginx 服務以提供靜態網站服務
#
# 使用方式：
# - 建置映像檔：docker build -t myhomelab:latest .
# - 執行容器：docker run -d -p 8081:8081 myhomelab:latest
# - 或使用專案提供的腳本：yarn docker:build
# ============================================================================

# 使用 nginx:alpine 作為基礎映像檔
# alpine 版本體積小，適合生產環境使用
# 注意：Alpine Linux 預設不包含 bash，只提供 sh
# 如需使用 bash，請取消下方安裝 bash 的註釋
FROM nginx:alpine

# 可選：安裝 bash（如果需要使用 bash 而不是 sh）
# 注意：這會增加映像檔大小，通常不建議在生產環境使用
RUN apk add --no-cache bash

# 將建置後的靜態檔案複製到 nginx 的網頁根目錄
# dist 目錄應包含建置後的 index.html 和相關資源檔案
COPY dist /usr/share/nginx/html/

# 暴露 8081 端口
# 注意：nginx 預設監聽 80 端口，若需使用 8081，可能需要額外配置
EXPOSE 8081

# 啟動 nginx 服務
# -g "daemon off;" 參數讓 nginx 在前景執行，使容器持續運行
CMD ["nginx", "-g", "daemon off;"]