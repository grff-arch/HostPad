const os = require('os');
const path = require('path');
const { exec } = require('child_process');

const PLATFORM = os.platform();

const winCommands = {
    'volumeUp': 'volumUpKey',
    'pause': 'space',
    'volumDown': 'volumDownKey'
}