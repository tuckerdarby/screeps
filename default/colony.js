let Nest = require('nest');

let colony = function(name) {
    var self = this,
        pk = name;

    self.initColony = function() {

    };
    self.initColony();

    self.getId = () => pk;

    return self;
};

module.exports = colony;