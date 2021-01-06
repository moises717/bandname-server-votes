const BandList = require("./BandList");

class Sockets {
	constructor(io) {
		this.io = io;

		this.bandList = new BandList();

		this.socketEvents();
	}

	socketEvents() {
		//On connection

		this.io.on("connection", (socket) => {
			console.log("Cliente conectado");

			// Emitir al cliente conectado , todas las bandas actuales.

			socket.emit("current-bands", this.bandList.getBand());
			socket.on("votar-banda", (id) => {
				this.bandList.increaseVotes(id);
				this.io.emit("current-bands", this.bandList.getBand());
			});
			socket.on("borrar-banda", (id) => {
				this.bandList.removeBand(id);
				this.io.emit("current-bands", this.bandList.getBand());
			});
			socket.on("cambiar-nombre", ({ id, name }) => {
				this.bandList.changeName(id, name);
				this.io.emit("current-bands", this.bandList.getBand());
			});
			socket.on("nueva-banda", ({ valor }) => {
				this.bandList.addBand(valor);
				this.io.emit("current-bands", this.bandList.getBand());
			});
		});
	}
}

module.exports = Sockets;
