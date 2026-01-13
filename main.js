
const { app, BrowserWindow, Tray, Menu, screen, globalShortcut, ipcMain } = require('electron');
const path = require('path');

let notchWindow;
let dashboardWindow;
let tray = null;

function createNotchWindow() {
  const { width } = screen.getPrimaryDisplay().workAreaSize;
  
  notchWindow = new BrowserWindow({
    width: 450,
    height: 350,
    x: Math.floor(width / 2 - 225),
    y: 0,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    movable: false,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  notchWindow.setAlwaysOnTop(true, 'screen-saver');
  notchWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  notchWindow.loadFile('index.html');
  
  // Custom logic to handle mouse-passthrough when collapsed could be added here
}

function createDashboardWindow() {
  dashboardWindow = new BrowserWindow({
    width: 1100,
    height: 750,
    show: false,
    frame: false,
    titleBarStyle: 'hiddenInset',
    vibrancy: 'under-window',
    visualEffectState: 'active',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  dashboardWindow.loadFile('index.html');
  
  dashboardWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      dashboardWindow.hide();
    }
    return false;
  });
}

function createTray() {
  // Use a simple template icon or your app icon
  tray = new Tray(path.join(__dirname, 'icon.png')); 
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open Dashboard', click: () => dashboardWindow.show() },
    { label: 'Toggle Notch', click: () => notchWindow.isVisible() ? notchWindow.hide() : notchWindow.show() },
    { type: 'separator' },
    { label: 'Quit Reality Check', click: () => {
        app.isQuiting = true;
        app.quit();
    }}
  ]);
  tray.setToolTip('Reality Check');
  tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  createNotchWindow();
  createDashboardWindow();
  createTray();

  // Global Shortcuts
  globalShortcut.register('CommandOrControl+K', () => {
    if (dashboardWindow.isVisible()) {
      dashboardWindow.hide();
    } else {
      dashboardWindow.show();
      dashboardWindow.focus();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createNotchWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
