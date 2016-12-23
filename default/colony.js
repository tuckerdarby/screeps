let Lair = require('lair');

let colony = function (name) {
    var self = this,
        pk = name,
        lairs = [],
        base;

    self.beginColony = (main) => {
        base = main;
        lairs.push(base);
        //sourceCheck();
    };

    self.initColony = () => {};
    self.initColony();

    self.getId = () => pk;

    return self;

    function sourceCheck() {
        let sources = getInactiveSources(base.getRoom(), lairs);
        sources.forEach((source) => {
            var lair = establishLair(source);
            lairs.push(lair);
        });
    }
};

module.exports = colony;

function establishLair(source) {
    var spawnPosition = getSpawnPosition(source);
    console.log(spawnPosition);
    //spawnPosition.createConstructionSite(STRUCTURE_SPAWN);
}

//Returns a RoomPosition Object that was selected based on the closest by path with plain terrain in a square pattern
function getSpawnPosition(source) {
    var positions = getSamplePositions(source.room, source.pos, 5),
        closest;
    positions = _.filter(positions, (position) => (Game.map.getTerrainAt(position) == 'plain'));
    closest = source.pos.findClosestByPath(positions);
    return closest;
}

function getInactiveSources(room, bases) {
    var usedSources = getActiveSources(bases),
        roomSources = room.find(FIND_SOURCES);
    return _.filter(roomSources, (source) => usedSources.indexOf(source.id) == -1);
}

//Returns ids of Managed Sources
function getActiveSources(bases) {
    var sources = [];
    bases.forEach((base) => {sources = sources.concat(base.getSources())});
    return sources;
}

function getSamplePositions(room, pos, range) {
    var positions = [];
    for (var x = -1; x < 2; x++) {
        for (var y = -1; y < 2; y++) {
            var px = pos.x + (x*range),
                py = pos.y + (y*range),
                loc = (px > -1 && py > -1 ? new RoomPosition(pos.x + (x*range), pos.y + (y*range), room.name) : false);
            if (loc != false)
                positions.push(loc);
        }
    }
    return positions;
}