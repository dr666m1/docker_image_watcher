'use strict'
const http = require("http")
const WebSocket = require("ws")
const chokidar = require("chokidar")
const target = ["sync/*png", "sync/*PNG", "sync/html"]

const ws = new WebSocket.Server({port: 9999})
const watcher = chokidar.watch(target, {persistent: true})

watcher
  .on("add", path => {
    console.log(`${path} has been added.`)
    ws.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${path}?dummy=${Date.now()}`.replace(/^sync\//,""))
      }
    })
  })
  .on("change", path => {
    console.log(`${path} has been changed`)
    ws.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${path}?dummy=${Date.now()}`.replace(/^sync\//,""))
      }
    })
  })
