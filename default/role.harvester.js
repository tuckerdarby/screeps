let roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var source = Game.getObjectById(creep.memory.source);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            targets = _.filter(targets, (target) => (target.energy < target.energyCapacity));
            if (targets.length > 0) {
                var transfer = creep.transfer(targets[0], RESOURCE_ENERGY);
                if (transfer == ERR_NOT_IN_RANGE)
                    creep.moveTo(targets[0]);
                else
                    console.log(transfer);
            } else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }

        }
    }
};

module.exports = roleHarvester;