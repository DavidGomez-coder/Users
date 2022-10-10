class User {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.connections = new Set(); //single id set (ensure that an user appear only once)
    }

    setId(id) { this.id = id; }
    setName(name) { this.name = name; }

    getId() { return this.id; }
    getName() { return this.name; }

    addConnection(idConnection) { this.connections.add(idConnection); }

    getConnections(){ return this.connections; }

}

module.exports = User;