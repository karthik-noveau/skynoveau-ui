# Skynoveau UI

**Skynoveau UI** is a modern, scalable, and reusable React-based component library and design system built to accelerate your development process with ready-to-use UI elements.

---

## 📦 Installation

You can install the package via **npm** or **yarn**:

```bash
npm install skynoveau-ui
# or
yarn add skynoveau-ui
```

---

## 🚀 Getting Started

### 1. Import and Use Components

```tsx
import React from "react";
import { Button } from "skynoveau-ui";

function App() {
  return <Button>Click Me</Button>;
}

export default App;
```

### 2. Import Global CSS (Optional)

To apply the default Skynoveau theme globally:

```tsx
import "skynoveau-ui/theme/theme.css";
```

### 3. Use CSS Modules (Optional)

For modular styling in components:

```tsx
import styles from "skynoveau-ui/theme/styles.module.css";

function HeroSection() {
  return <div className={styles.hero}>Welcome to Skynoveau!</div>;
}
```

---

## 🧱 Components

Skynoveau UI ships with a growing collection of components. Each component is designed to be:

* **Modular** – use only what you need
* **Customizable** – style via props, CSS Modules, or your theme
* **Typed** – full TypeScript support

### ✅ Available Components

| Component    | Description               |
| ------------ | ------------------------- |
| `Button`     | Base button with variants |
| `Input`      | Styled input fields       |
| `Modal`      | Dialog modal component    |
| `Card`       | Flexible layout cards     |
| `Slider`     | Accessible slider input   |
| `Typography` | Headings, text, etc.      |
| `Badge`      | Status indicators         |
| `Avatar`     | Profile pictures          |
| `Toast`      | Notification popups       |

---

## 🎨 Theming & Styling

### Global Theme CSS

Import once to apply the base design system colors, spacing, and typography.

```ts
import "skynoveau-ui/theme/theme.css";
```

### CSS Modules

Use scoped CSS Modules in your components:

```tsx
import styles from "skynoveau-ui/theme/styles.module.css";

return <div className={styles.banner}>Styled Banner</div>;
```

---

## 📁 Folder Structure

Your installed package will look like this:

```
skynoveau-ui/
├── dist/
│   ├── index.js             # Main entry
│   ├── index.d.ts           # Type declarations
│   └── theme/
│       ├── theme.css        # Global styles
│       └── styles.module.css # Scoped styles
```

---

## 🛠 Usage with TypeScript

Skynoveau UI comes with full TypeScript support. Autocomplete, prop checking, and IntelliSense work out-of-the-box.

```tsx
import { Button } from "skynoveau-ui";

const MyForm = () => {
  return <Button type="submit" disabled={false}>Submit</Button>;
};
```

You can also extend or override component props using your own types.

---

## 🧪 Example App

You can quickly spin up a local project using Vite or Next.js and test the components:

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install skynoveau-ui
```

In `src/App.jsx`:

```tsx
import { Button } from "skynoveau-ui";
import "skynoveau-ui/theme/theme.css";

function App() {
  return (
    <div>
      <h1>Hello from Skynoveau</h1>
      <Button>Get Started</Button>
    </div>
  );
}

export default App;
```

---

## 📜 Example: Custom Button with Local Styles

```tsx
import React from "react";
import { Button } from "skynoveau-ui";
import styles from "skynoveau-ui/theme/styles.module.css";

function CTA() {
  return (
    <div className={styles.cta}>
      <Button>Explore Now</Button>
    </div>
  );
}
```

---

## 🌐 CDN / External Use

Not available yet. Planned support via Skynoveau CDN delivery in future versions.

---

## 📦 Package.json Config (Library Side)

```json
{
  "name": "skynoveau-ui",
  "version": "1.0.21",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./theme/styles.module.css": "./dist/theme/styles.module.css"
  },
  "sideEffects": [
    "./dist/theme/theme.css",
    "./dist/theme/styles.module.css"
  ],
  "files": ["dist"]
}
```

---

## 👨‍💻 Local Development (Contributing)

### Clone and Setup

```bash
git clone https://github.com/skynoveau/skynoveau-ui.git
cd skynoveau-ui
npm install
```

### Run in Dev Mode

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create a new branch (`git checkout -b feature/component-name`)
3. Make your changes
4. Submit a PR with a clear title and description

---

## 📄 License

Licensed under the [MIT License](./LICENSE).

---

## 🔗 Links

* [Official Website](https://skynoveau.com)
* [Documentation](https://skynoveau.com/docs) *(coming soon)*
* [NPM Package](https://www.npmjs.com/package/skynoveau-ui)

---

## 💬 Support

Having issues or suggestions?
Open an [issue](https://github.com/skynoveau/skynoveau-ui/issues) or email us at **[support@skynoveau.com](mailto:support@skynoveau.com)**

---

## 🚀 Made with ❤️ by Skynoveau Technology
