# myHomeLab Dashboard

The **myHomeLab Dashboard** is a customizable web-based dashboard designed to organize and access various services in a home lab setup. It allows users to group links to their services into categories, making it easy to manage and navigate resources like media servers, development tools, and more.

## Features

- **Grouped Links**: Organize services into categories (groups) for better management.
- **Customizable Styling**: Add icons, colors, and subtitles to groups and links for a personalized look.
- **TypeScript Support**: Strongly typed with TypeScript for better development experience and error prevention.
- **JSON Configuration**: Easily configure the dashboard by editing a JSON file.

## Recommended Package Manager

We recommend using **Yarn** as the package manager for this project due to its advantages in speed, consistency, and security. Yarn offers faster dependency installations, consistent dependency management through a lockfile, and built-in security features. However, you can still use **npm** if you prefer.

If you don't have Yarn installed, you can install it globally using npm:

```bash
npm install -g yarn
```

## Installation

To get started with the myHomeLab Dashboard, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/damonwonghv/myHomeLab.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd myHomeLab
   ```

3. **Install Dependencies**:
   - Using Yarn (recommended):
     ```bash
     yarn
     ```
   - Using npm:
     ```bash
     npm install
     ```

4. **Start the Development Server**:
   - Using Yarn:
     ```bash
     yarn dev
     ```
   - Using npm:
     ```bash
     npm run dev
     ```

The dashboard should now be running.

## Usage

### Configuring Your Dashboard

The dashboard data is configured via a JSON file located at `public/data/data.json`. This file defines the dashboard's name, an optional icon, and an array of groups containing links.

#### Example `data.json`

```json
{
  "name": "myHomeLab",
  "icon": "home-icon.png",
  "data": [
    {
      "group": {
        "title": "Media Servers",
        "icon": "film.png",
        "color": "#3498db"
      },
      "links": [
        {
          "title": "Plex",
          "url": "http://plex.local",
          "icon": "plex.png",
          "subtitle": "Stream movies and TV shows"
        },
        {
          "title": "Jellyfin",
          "url": "http://jellyfin.local",
          "icon": "jellyfin.png"
        }
      ]
    },
    {
      "group": {
        "title": "Development Tools",
        "icon": "code.png",
        "color": "#2ecc71"
      },
      "links": [
        {
          "title": "GitLab",
          "url": "http://gitlab.local",
          "icon": "gitlab.png",
          "bgColor": "#e24329",
          "textColor": "#ffffff"
        },
        {
          "title": "Jenkins",
          "url": "http://jenkins.local",
          "icon": "jenkins.png"
        }
      ]
    }
  ]
}
```

### Customizing Links and Groups

- **Links**: Each link requires a `title` and `url`. Optional properties include `icon`, `bgColor`, `textColor`, and `subtitle`.
- **Groups**: Each group requires a `title`. Optional properties include `icon` and `color`.

These properties allow you to tailor the appearance of your dashboard to match your preferences or branding.

### Configuration Reloading
- After editing **`data.json`**, simply refresh the browser to see changes.
- No need to restart the server.

### Icon Guidelines

Icons can be added to both groups and links. You can use image files (e.g., PNG, SVG). Ensure that the icon paths are correct relative to the project's public directory.

- Recommended size: 32x32px (PNG or SVG)
- Place custom icons in **`public/data/icon/`**
- For icon font support, see our wishlist.

## Project Structure

- **`src/`**: Contains the source code for the dashboard.
- **`public/data/data.json`**: Configuration file for the dashboard data.
- **`public/data/icon`**: Icons file for the dashboard data.
- **`public/`**: Static assets like icons and images.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system. Please use the latest LTS version (Node.js 20 or above). You can download it from [nodejs.org](https://nodejs.org/).

## Docker Deployment

### Dockerfile Overview

此專案包含一個 Dockerfile，用於將應用程式打包成 Docker 映像檔並部署為容器。

**Dockerfile 功能說明：**
- 使用 `nginx:alpine` 作為基礎映像檔（輕量級 Web 伺服器）
- 將建置後的靜態檔案（`dist` 目錄）複製到 nginx 的網頁根目錄
- 暴露 8081 端口供外部存取
- 啟動 nginx 服務以提供靜態網站服務

### 建置與執行 Docker 容器

#### 方法一：使用專案提供的腳本（推薦）

專案已提供 `docker:build` 腳本，會自動建置專案並打包成 Docker 映像檔：

```bash
# 使用 Yarn
yarn docker:build

# 使用 npm
npm run docker:build
```

此腳本會：
1. 編譯 TypeScript 程式碼
2. 建置 Vite 專案（產生 `dist` 目錄）
3. 建置 Docker 映像檔（標籤為 `damonwong/myhomelab:latest`）

#### 方法二：手動建置

1. **建置專案**：
   ```bash
   # 使用 Yarn
   yarn build
   
   # 使用 npm
   npm run build
   ```

2. **建置 Docker 映像檔**：
   ```bash
   docker build -t myhomelab:latest .
   ```

3. **執行容器**：
   ```bash
   docker run -d -p 8081:8081 myhomelab:latest
   ```

4. **存取應用程式**：
   開啟瀏覽器並前往 `http://localhost:8081`

### Docker 命令參考

```bash
# 建置映像檔
docker build -t myhomelab:latest .

# 執行容器（背景執行）
docker run -d -p 8081:8081 --name myhomelab myhomelab:latest

# 檢視執行中的容器
docker ps

# 檢視容器日誌
docker logs myhomelab

# 停止容器
docker stop myhomelab

# 移除容器
docker rm myhomelab

# 移除映像檔
docker rmi myhomelab:latest
```

### 注意事項

- Dockerfile 中暴露的端口為 8081，nginx 預設監聽 80 端口。若需使用 8081，可能需要額外配置 nginx 設定檔。
- 確保在建置 Docker 映像檔之前已執行 `yarn build` 或 `npm run build`，以產生 `dist` 目錄。
- 若使用 `docker:build` 腳本，會自動處理建置流程。

## Wishlist
1. Support icon fonts (e.g. Font Awesome).
2. Notice box
3. Detail for link

## Contributing

Contributions are welcome! If you have suggestions, improvements, or bug fixes, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## Reporting Issues

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/damonwonghv/myHomeLab/issues).

## License

This project is licensed under the [MIT License](LICENSE).
