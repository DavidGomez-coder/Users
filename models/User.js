class User {
    constructor(id, name, connections){
        this.id = id;
        this.name = name;
        this.connections = connections //single id set (ensure that an user appear only once)
    }

    setId(id) { this.id = id; }
    setName(name) { this.name = name; }

    getId() { return this.id; }
    getName() { return this.name; }

    addConnection(idConnection) { this.connections.add(idConnection); }

    setConnections(connectinos) { this.connections = connectinos; }
    getConnections(){ return this.connections; }

}

module.exports = User;