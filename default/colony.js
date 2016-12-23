let Lair = require('lair');

let colony = function (name) {
    var self = this,
        pk = name,
        lairs = [],
        base;

    self.beginColony = (main) => {
        base = main;
        lairs.push(base);
        console.log('beginning colony');
        sourceCheck();
    };

    self.initColony = () => {
        console.log('establishing colony');
    };
    self.initColony();

    self.getId = () => pk;

    return self;

    function sourceCheck() {
        let sources = getInactiveSources(base.room),
            testClosests = [];
        sources.forEach((source) => {
            var positions = getSamplePositions(source.pos, 5),
                closest;
            positions = _.filter(positions, (position) => (Game.map.getTerrainAt(position) == 'plain'));
            closest = source.pos.findClosestByPath(positions);
            testClosests.push(closest);
        });
        testClosests.forEach((c) => {console.log(c);});
    }

    function establishLair(source) {

    }
};

module.exports = colony;

function getInactiveSources(room) {
    var spawns = room.find(FIND_MY_SPAWNS);
    spawns.forEach((spawn) => {
        var closest = spawn.pos.findClosestByRange(FIND_SOURCES),
            index = (closest ? sources.indexOf(closest) : -1);
        if (index > -1)
            sources.splice(index, 1);
    });
}

function getSamplePositions(pos, range) {
    var positions = [];
    for (var x = -1; x < 2; x++) {
        for (var y = -1; y < 2; y++) {
            var loc = new RoomPosition(pos.x + (x*range), pos.y + (y*range), pos.room.name);
            positions.push(loc);
        }
    }
    return positions;
}