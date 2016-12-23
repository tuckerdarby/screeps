let nest = function (name, lair) {
    var self = this,
        pk = name,
        spawn = lair,
        queue = [];

    self.initNest = function () {

    };
    self.initNest();

    self.getId = () => pk;

    self.nestCreep = function(data) {
        if (queue.length > 0) {
            addToQueue(data);
        } else {
            if (spawn.canCreateCreep(data.body) == OK)
                spawnCreep(data);
            else
                addToQueue(data);
        }
    };

    self.runNest = () => {
        if (queue.length > 0) {
            spawnCreep(queue[0], 0);
        }
    };

    return self;

    function spawnCreep(data, index) {
        if (spawn.canCreateCreep(data.body) == OK) {
            var name = spawn.createCreep(data.body, data.name, data.memory);
            if (index)
                queue.splice(index,1);
        }
    }

    function addToQueue(data) {
        queue.push(data);
        queue.sort(function(a,b) {
            return a.priority - b.priority;
        });
    }
};

module.exports = nest;
