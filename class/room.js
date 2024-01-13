class Room {

    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.exits = {};
        this.items = [];
        this.enemies = [];
    }

    printRoom() {
        console.clear();
        console.log("");
        console.log(this.name);
        console.log("");
        console.log(this.description);
        console.log("");
        if (this.items.length > 0) {
            console.log(`Items: ${this.items.map(item => item.name).join(", ")}`);
        }
        console.log("");
        if (this.enemies.length > 0) {
            console.log(`There are: ${this.enemies.map(en => en.name).join(", ")} enemies here.`);
        }
        console.log(this.getExitsString());
        console.log("");
    }

    getExits() {
        return Object.keys(this.exits);
    }

    getExitsString() {
        return `Exits: ${this.getExits().join(", ")}`
    }

    connectRooms(direction, connectingRoom) {

        // Check if the direction and connecting room are valid
        if (['n', 's', 'e', 'w'].indexOf(direction) < 0 || !connectingRoom) {
            throw new Error("Error: Invalid room connection");
        }

        this.exits[direction] = connectingRoom;
    }

    getRoomInDirection(direction) {
        return this.exits[direction];
    }

    getItemByName(name) {
        // Retrieves an item from a room by item name
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];

            if (item.name === name) {
                this.items.splice(i, 1)
                console.log("about to get ", item)
                return item
            }
        }
    }

}

module.exports = {
  Room,
};