pfun()

contextBridge.exposeInMainWorld('api', {
    setItem: async (key, value) => {
        return await ipcRenderer.invoke('set-item', key, value);
    },
    getItem: async (key) => {
        return await ipcRenderer.invoke('get-item', key);
    },
    createConnection: async (clientId, url) => {
        return await ipcRenderer.invoke('create-connection', clientId, url);
    },
    removeConnection: async (url) => {
        return await ipcRenderer.invoke('remove-connection', url);
    },    
    getConnections: async () => {
        return await ipcRenderer.invoke('get-connections');
    },    
    getToken: async (url) => {
        return await ipcRenderer.invoke('get-token', url);
    }, 
    sendLoginMessage: () => {
        ipcRenderer.send('LOGIN');
    },
    sendSignoutMessage: () => {
        ipcRenderer.send('LOGOUT');
    },
    sendSeeProfileMessage: () => {
        ipcRenderer.send('GET_PROFILE');
    },
    handleProfileData: (func) => {
        ipcRenderer.on('SET_PROFILE', (event, ...args) => func(event, ...args));
    },
    showWelcomeMessage: (func) => {
        ipcRenderer.on('SHOW_WELCOME_MESSAGE', (event, ...args) => func(event, ...args));
    },
});



