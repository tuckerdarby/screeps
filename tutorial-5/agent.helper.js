
var agentHelper = {
    getRoles: function (creepRole) {return _.filter(Game.creeps, (creep) => {return (creep.memory.role == creepRole);});}
};

module.exports = agentHelper;