let VERSION = 1,
    _sv = ['jux',VERSION].join('-'),
    hiveName = 'Spawn1',
    agent = require('agent')('Agent1', hiveName); // script version to namespace Memory object

module.exports.loop = function () {
    //Recycle
    clearCreeps();

    //Run
    agent.runAgent();
};

function clearCreeps() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}