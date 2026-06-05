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

const handlerCom = (command) => {
    const systemCom = winCommands[command];

    if (!systemCom) {
        return console.error('Ошибка, такой команды нет');
    };

    exec(systemCom,{cwd: nircmdFolder}, error => {
        if (error) {
            console.error('Ошибка выполнения', error.message);
        }
        console.log("Команда выполнилась")
    });
};
module.exports = { handlerCom };