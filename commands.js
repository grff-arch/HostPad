const os = require('os');
const path = require('path');
const { exec } = require('child_process');

const PLATFORM = os.platform();

const nircmd = path.join(__dirname, "bin", "nircmd.exe")
const nircmdFolder = path.join(__dirname, "bin")

const winCommands = {
    'up': `"${nircmd}" changesysvolume 4000`,
    'mute_on': `"${nircmd}" mutesysvolume 2`,
    'mute_off': `"${nircmd}" mutesysvolume 0`,
    'down': `"${nircmd}" changesysvolume -4000`,
    'monitor_off': `"${nircmd}" monitor off`,
    'shutdown': `"${nircmd}" exitwin poweroff`,
    'sleep': `"${nircmd}" standby`
};

const linuxCommands = {
    'up': `wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+`,
    'mute_on': `wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle`,
    'mute_off': `wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle`,
    'down': `wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-0`,
    'monitor_off': `busctl --user call org.gnome.Mutter.DisplayConfig /org/gnome/Mutter/DisplayConfig org.gnome.Mutter.DisplayConfig PowerSaveMode i 1`,
    'shutdown': `systemctl poweroff`,
    'sleep': `systemctl suspend`
}

const handlerCom = (command) => {
    const systemComWin = winCommands[command];
    const systemComLin = linuxCommands[command]

    if (!systemComWin || !linuxCommands) {
        return console.error('Ошибка, такой команды нет');
    };

    if (systemComWin) {
        exec(systemComWin,{cwd: nircmdFolder}, error => {
        if (error) {
            console.error('Ошибка выполнения', error.message);
        }
        console.log("Команда выполнилась")
    });
    } else if (systemComLin) {
        exec(systemComLin, error => {
        if (error) {
            console.error('Ошибка выполнения', error.message);
        }
        console.log("Команда выполнилась")
    });
    } else {
        console.error('Ошибка, дял вашей ОС приложение еще не разработано')
    }
    
};
module.exports = { handlerCom };