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
    'up': `wpctl set-volume -l 1.0 @DEFAULT_AUDIO_SINK@ 5%+`,
    'mute_on': `wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle`,
    'mute_off': `wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle`,
    'down': `wpctl set-volume -l 1.0 @DEFAULT_AUDIO_SINK@ 5%-`,
    'monitor_off': 'busctl --user set-property org.gnome.SettingsDaemon.Power /org/gnome/SettingsDaemon/Power org.gnome.SettingsDaemon.Power ScreenBlanking i 1',
    'monitor_on': 'busctl --user set-property org.gnome.SettingsDaemon.Power /org/gnome/SettingsDaemon/Power org.gnome.SettingsDaemon.Power ScreenBlanking i 0',
    'sleep': 'systemctl suspend',   
    'shutdown': `systemctl poweroff`,
    'sleep': `systemctl suspend`
}
    
const handlerCom = (command) => {
    const systemComWin = winCommands[command];
    const systemComLin = linuxCommands[command]

    if (!systemComWin || !linuxCommands) {
        return console.error('Ошибка, такой команды нет');
    };

    if (PLATFORM === "win32") {
        exec(systemComWin,{cwd: nircmdFolder}, error => {
        if (error) {
            console.error('Ошибка выполнения', error.message);
        }
        console.log("Команда выполнилась")
    });
    } else if (PLATFORM === "linux") {
        exec(systemComLin, error => {
        if (error) {
            return console.error('Ошибка выполнения', error.message);
        }
        console.log("Команда выполнилась")
    });
    } else {
        console.error('Ошибка, дял вашей ОС приложение еще не разработано')
    }
    
};
module.exports = { handlerCom }; 