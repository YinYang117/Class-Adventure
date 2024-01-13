const { Room } = require('./room');
const { Item } = require('./item');
const { Food } = require('./food');
const { Weapon } = require('./weapon');
const { Enemy } = require('./enemy');

class World {
    constructor() {
        this.rooms = {};
    }

    loadWorld(worldData) {

        const roomList = worldData.rooms;
        const itemList = worldData.items;
        const enemyList = worldData.enemies

        // Instantiate new room objects
        // Get name, id and description from room data
        for (let i = 0 ; i < roomList.length ; i++) {

            let roomData = roomList[i];
            let newRoom = new Room(roomData.name, roomData.description);

            this.rooms[roomData.id] = newRoom;
        }

        // Connect rooms by ID
        // Note that all rooms must be created before they can be connected
        for (let i = 0 ; i < roomList.length ; i++) {

            let roomID = roomList[i].id;
            let roomConnections = roomList[i].exits;

            for (const direction in roomConnections) {
                let connectedRoomID = roomConnections[direction];
                let roomToConnect = this.rooms[connectedRoomID];
                this.rooms[roomID].connectRooms(direction, roomToConnect);
            }

        }

        // Instantiate items using data stored in the itemList variable
            // A non-food item should be instantiated as an instance of the `Item` class
            // A food item should be instantiated as an instance of the `Food` class
        
        itemList.forEach(item => {
            if (item.isFood) {
                let food = new Food(item.name, item.description);
                this.rooms[item.room].items.push(food)
            } else if (item.isWeapon){
                let weapon = new Weapon(item.name, item.description, item.damage);
                this.rooms[item.room].items.push(weapon)
            } else {
                let newItem = new Item(item.name, item.description);
                this.rooms[item.room].items.push(newItem)
            }
        }); 

        // Instantiate all the enemies:
        enemyList.forEach(enemy => {
            let newEnemy = new Enemy(enemy.name, enemy.description, enemy.hp)
            let dagger = new Weapon("Dagger", "A short stabby dagger", 15)
            newEnemy.weapon = dagger;
            let rand = Math.floor(Math.random() * (4 - 1) + 1)

            this.rooms[rand].enemies.push(newEnemy)
        })
        
    }
}

module.exports = {
  World,
};
