var connection;
var isconnect = false;
var self = this

var websocket = function(_callback){
	connection = new WebSocket("ws://localhost:3000");

	connection.onopen = function () {
		isconnect = true;
		console.log("connected");
	};
	
	connection.onmessage = function (evt) {
		var res = JSON.parse(evt.data);
		updatePlays(res)
		console.log(res);
	};

	connection.onclose = function () {
		isconnect = false;
		console.log("onclose");
		setTimeout(function () {
			self.websocket(_callback);
		}, 1000);
	};

	connection.onerror = function (error) {
		isconnect = false;
		console.log(error);
	};
}

function send(message){
	connection.send(JSON.stringify(message));
}

websocket();