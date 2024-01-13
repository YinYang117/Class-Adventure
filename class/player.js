const { Food } = require('./food');
const { Weapon } = require('./weapon');

class Player {

    constructor(name, startingRoom, equipedWeapon) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
        this.equipedWeapon = null;
    }

    move(direction) {
        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        let item = this.currentRoom.getItemByName(itemName);
        console.log(" you took", item)
        this.items.push(item);
    }

    dropItem(itemName) {
        let item = this.getItemByName(itemName);
        this.currentRoom.items.push(item);
    }

    eatItem(itemName) {
        let item = this.getItemByName(itemName);

        if (!(item instanceof Food)) {
            this.items.push(item);
        }
    }

    getItemByName(name) {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];

            if (item.name === name) {
                this.items.splice(i, 1)
                return item
            }
        }
    }

    equipWeapon(name) {
        let weapon = this.getItemByName(name);
        if (!(weapon instanceof Weapon)) this.items.push(weapon);
        else this.equipedWeapon = weapon;
    }

    attack(creatureName) {
        if (!this.equipedWeapon) {
            if (this.currentRoom.enemies.length) {
                let enemy = this.currentRoom.enemies[0]
                enemy.hp -= 5;
                console.log(`You deal 5 damage to ${enemy.name}. It has ${enemy.hp} hp left.`)
            } else console.log('no enemies')
        } else {
            if (this.currentRoom.enemies.length) {
                let enemy = this.currentRoom.enemies[0]
                enemy.hp -= this.equipedWeapon.damage;
                console.log(`You deal ${this.equipedWeapon.damage} to ${enemy.name}. It has ${enemy.hp} hp left.`)
            } else console.log('no enemies')
        }
    }
}

module.exports = {
  Player,
};
