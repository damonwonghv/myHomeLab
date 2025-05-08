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
