const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const path = require('path');


const menuItems = [{
    label:"Hi",
    submenu:[
        {
            label:"Web Camera",
            click:()=>createW("camera.html", "cameraPreload.js")
        },
        {
            label:"google site",
            click:async()=>{
                // createW('about.html');
                const win2 = new BrowserWindow({
                    width:500,
                    height:400,
                    show:false
                })
                win2.loadURL("https://google.com/");
                win2.once('ready-to-show', ()=>{
                    win2.show();
                })
            }
        },  
        {
            type:"separator"
        },
        {
            label:"About", click:()=>{
                const parentW = new BrowserWindow({
                                    width:500,
                                    height:400,
                                    show:false
                                })

                const child = new BrowserWindow({
                    width:400,
                    height:300,
                    show:false,
                    parent:parentW
                });
                parentW.loadURL("https://google.com/");
                child.loadFile('about.html')

                parentW.once('ready-to-show', ()=>{
                    parentW.show();
                    child.show();
                    
                })
            }
        },
        {
            label:"Exit", click:()=>app.quit()
        },

        

    ]
}]


const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);
const createWindow = ()=>{
    const win = new BrowserWindow({
        height:1180,
        width:820,
        webPreferences:{
            preload:path.join(__dirname, 'preload.js')
        }

    });
    ipcMain.on('set-image', (event, data)=>{
        win.webContents.send('get-image', data);
    })
    

    win.webContents.openDevTools();
    
    win.loadFile('index.html');

}
const createW = (filename, preload="")=>{
    const win = new BrowserWindow({
        height:1080,
        width:800,
        webPreferences:{
            preload:path.join(__dirname, preload)
        }

    });
    ipcMain.on('destroy', ()=> win.close())
    win.webContents.openDevTools();
    win.loadFile(`${filename}`);

}

app.whenReady().then(()=>{
    createWindow()
    
});

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
})