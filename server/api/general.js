'use strict';

//Quick check that backend is up
function init(req, res) {
  res.status(200).send("OK");
  console.log("sending ok message")
};

//Ping the backend
function ping(req, res) {
  res.status(200).send('Ping OK');
  console.log("pinging")
}

module.exports = {
  init,
  ping
};