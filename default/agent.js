let roles = require('roles'),
    Colony = require('colony'),
    Lair = require('lair');

let agent = function (name, hostName) {
    var self = this,
        pk = name,
        hiveName = hostName,
        hive = Lair(hiveName),
        colony = Colony(hiveName);

    self.getId = () => pk;

    self.initAgent = () => {
        establishHive(hive);
    };
    self.initAgent();

    self.runAgent = () => {
        hive.runLair();
        runRoles(Game.creeps);
    };

    return self;

    function establishHive() {
        let source = hive.getSpawn().pos.findClosestByRange(FIND_SOURCES);
        hive.addSource(source);
        colony.beginColony(hive);
    }

    function runRoles(creeps) {
        for (var creep in creeps) {
            roles[creeps[creep].memory.role].run(creeps[creep]);

        }
    }
};



module.exports = agent;





