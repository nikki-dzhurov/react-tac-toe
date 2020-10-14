const { app, BrowserWindow, Menu } = require('electron');

const isMac = process.platform === 'darwin';

function createWindow() {
	const win = new BrowserWindow({
		width: 600,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.loadFile('./build/index.html');
	win.once('ready-to-show', () => {
		win.show();
		win.focus();
	});

	const menu = new Menu();
	menu.setApplicationMenu(
		menu.buildFromTemplate([{
			label: 'File',
			submenu: [
				isMac ? { role: 'close' } : { role: 'quit' },
			],
		}]),
	);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (isMac) {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
