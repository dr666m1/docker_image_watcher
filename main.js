'use strict'
const http = require("http")
const fs = require("fs")
const WebSocket = require("ws")
const chokidar = require("chokidar")
const target = ["sync/*png", "sync/*PNG", "sync/*html"]

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    console.log(`url is ${req.url}`)
    if (req.url === "/") {
      fs.readFile("./index.html", (err, data) => {
        return res.end(data)
      })
    } else {
      fs.readFile("./sync" + req.url, (err, data) => {
        if (err) console.log(`cannot find "${req.url}"`)
        return res.end(data)
      })
    }
  } else {
    res.statusCode = 405
    return res.end()
  }
}).listen(9999)

const ws = new WebSocket.Server({server})
//const ws = new WebSocket.Server({port: 9999})

const watcher = chokidar.watch(target, {persistent: true})

watcher
  .on("add", path => {
    console.log(`${path} has been added.`)
    ws.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        //client.send(`${path}`.replace(/^sync\//,""))
        client.send(`${path}?dummy=${Date.now()}`.replace(/^sync\//,""))
      }
    })
  })
  .on("change", path => {
    console.log(`${path} has been changed`)
    ws.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        //client.send(`${path}`.replace(/^sync\//,""))
        client.send(`${path}?dummy=${Date.now()}`.replace(/^sync\//,""))
      }
    })
  })

