import npm from 'npm';

var commands = {};

commands.install = function(args) {
    return new Promise(function(resolve, reject) {
        npm.commands.install(args, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};

function makePromiseApi(base, functionName){
    return function(){
        let args = arguments;
        return new Promise(function(resolve, reject){
            base[functionName].call(this, ...args, function(err, data){
                if (err === undefined) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        })
    }
}

let load = makePromiseApi(npm , 'load');

Object.keys(npm.commands).forEach(function(functionName){
    commands[functionName] = makePromiseApi(npm.commands, functionName);
});

export default {
    load,
    commands
}