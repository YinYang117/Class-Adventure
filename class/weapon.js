const {Item} = require("./item")

class Weapon extends Item{
    constructor(name, description, damage, isRanged = false) {
        super(name, description);
        this.damage = damage;
        this.isRanged = isRanged;
    }


}

exports.Weapon = Weapon;