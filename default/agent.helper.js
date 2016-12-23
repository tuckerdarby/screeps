
var agentHelper = {
    getRoles: (creepRole) => _.filter(Game.creeps, (creep) => creep.memory.role == creepRole)
};

module.exports = agentHelper;