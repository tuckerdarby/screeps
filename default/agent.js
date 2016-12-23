let roles = require('roles'),
    Colony = require('colony'),
    Lair = require('lair');

let agent = function (name, hostName) {
    var self = this,
        pk = name,
        hiveName = hostName,
        hive = Lair(hiveName),
        colony = Colony(hive);

    self.getId = () => pk;

    self.initAgent = () => {
        console.log('AGENTO');
        establishHive(hive);
    };
    self.initAgent();

    self.runAgent = () => {
        hive.runLair();
        runRoles(Game.creeps);
    };

    return self;

    function establishHive() {
        console.log('establishing hive');
        let source = hive.getSpawn().pos.findClosestByRange(FIND_SOURCES);
        hive.addSource(source);
    }

    function runRoles(creeps) {
        for (var creep in creeps) {
            roles[creeps[creep].memory.role].run(creeps[creep]);
        }
    }
};



module.exports = agent;





