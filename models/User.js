class User {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.connections = [];
    }

    setId(id) { this.id = id; }
    setName(name) { this.name = name; }
    setConnections(connections) { this.connections = connections; }


    getId() { return this.id; }
    getName() { return this.name; }
    getConnections() { return this.connections; }

}

module.exports = User;