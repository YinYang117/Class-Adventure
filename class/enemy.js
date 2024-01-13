class Enemy{
    constructor(name, description, hp, weapon = null) {
        this.name = name;
        this.description = description;
        this.hp = hp;
        this.weapon = weapon
    }


}

module.exports = {
    Enemy
};