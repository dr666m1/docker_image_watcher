'use strict'
const http = require("http")
const WebSocket = require("ws")
const chokidar = require("chokidar")

const ws = new WebSocket.Server({port: 9999})
const watcher = chokidar.watch("*.png", {persistent: true})

watcher
  .on("add", path => ws.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`${path}?dummy=${Date.now()}`)
    }
  }))
  .on("change", path => ws.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`${path}?dummy=${Date.now()}`)
    }
  }))

