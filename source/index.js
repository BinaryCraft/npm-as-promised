import npm from 'npm';
import convertToPromiseApi from './convertToPromiseApi';

var commands = {};

Object.keys(npm.commands).forEach(function(functionName) {
    commands[ functionName ] = convertToPromiseApi(npm.commands, functionName);
});

let npmAsPromised = {
    load : convertToPromiseApi(npm, 'load'),
    commands
};

function copyConfigProperty() {
    Object.defineProperty(npmAsPromised, 'config', {
        get: function() {
            return npm.config;
        },
        set: function(value) {
            npm.config = value;
        },
        configurable: true
    });
}

copyConfigProperty();

export default npmAsPromised;