
# Reality Check 

An intelligent macOS productivity companion that mirrors the gap between your intent and real usage data.

## Features
- **Dynamic Notch Overlay**: A persistent system-level overlay (Notch) that tracks focus time and music playback.
- **Intelligence Dashboard**: Deep-dive analytics into your usage patterns and productivity "Reality Gap."
- **Focus Flight**: Dedicated Pomodoro-style sessions that darken your desktop to keep you in orbit.
- **Spotify Integration**: Direct control and track monitoring within the application.
- **Notion Quick-Link**: Instant access to your knowledge base from the Notch.
- **Native macOS Feel**: Frameless windows, vibrancy effects, and global keyboard shortcuts.

---

## Installation & Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Git](https://git-scm.com/)

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/reality-check.git
cd reality-check
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Running Locally
To launch the application as a native macOS Electron app:
```bash
npm start
```

---

## Native Controls & Shortcuts

| Shortcut | Action |
| --- | --- |
| `Cmd + K` | Toggle Intelligence Dashboard |
| `Cmd + Shift + N` | Toggle the Notch visibility |
| `Cmd + D` | Toggle Do Not Disturb (DND) mode |
| `Esc` | Close active dashboard window |

---

## Configuration

### Spotify Integration
The app currently simulates Spotify status. To connect to the real Spotify API:
1. Obtain a `CLIENT_ID` from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Plug your credentials into the `IntegrationsHub.tsx` logic or use a local `.env` file.

### Notion Integration
The Notion button in the Notch attempts to open the native Notion desktop app (`notion://`) or falls back to the browser. Ensure Notion is installed for the best experience.

---

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request or open an issue for feature requests.

## License
MIT
