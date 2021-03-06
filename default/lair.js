let roles = require('roles'),
    roleList = ['harvester', 'upgrader', 'builder'],
    roleRoster = {
        'harvester': 20,
        'upgrader': 5,
        'builder': 4
    };
let Nest = require('nest');

let lair = function (name) {
    var self = this,
        pk = name,
        spawn = Game.spawns[pk],
        nest = Nest(pk, spawn),
        managedWorkers = {},
        managedSources = [];

    self.getId = () => pk;

    self.getSourceManagers = () => managedSources;
    self.getSources = () => {return managedSources.map((manager) => manager.source);};
    self.addSource = (source) => addSource(source);

    self.runLair = () => {
        manageSources(managedSources);
        nest.runNest();
    };

    self.spawnCreep = (data) => nest.nestCreep(data);
    self.getSpawn = () => spawn;
    self.getRoom = () => spawn.room;

    self.initNest = () => {
    };
    self.initNest();

    return self;

    function manageSources(sources) {
        sources.forEach((manager) => {
            if (manager.workers.length < roleRoster.harvester) {
                let workerData = makeWorkerData(manager);
                manager.buildCount += 1;
                manager.workers.push(workerData);
                nest.nestCreep(workerData);
            }
        });
    }

    function addSource(source) {
        let manager = {
            name: [pk, '-source', managedSources.length].join(''),
            source: source.id,
            workers: [],
            buildCount: 0
        };
        managedSources.push(manager);
    }

    function makeWorkerData(manager) {
        let workerData = {
            memory: {role: 'harvester', spawn: pk, source: manager.source},
            body: [CARRY, MOVE, WORK],
            name: [manager.name, '-worker', manager.buildCount].join(''),
            priority: 1
        };
        return workerData;
    }
};

module.exports = lair;



