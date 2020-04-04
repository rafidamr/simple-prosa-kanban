const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
var data = require('./data.json')

router.get('/', (req, res) => {
	res.render('index', { boards : JSON.stringify(data) })
})

router.post('/create', (req, res) => {
	let request = req.body
		board = data.find(b => b.id == `${request["board-id"]}`)
	board.item = request['board-items']
	res.send(data)
})

router.post('/delete', (req, res) => {
	let request = req.body
		board = data.find(b => b.id == `${request["board-id"]}`)
		itemId  = board.item.map(i => i.id).indexOf(request["item-id"])
	delete board.item.splice(itemId, 1)
	res.send(data)
})

router.post('/update', (req, res) => {
	let request = req.body
		bsource = data.find(b => b.id == `${request["bsource-id"]}`)
		removedItemIdx = bsource.item.map(i => i.id).indexOf(request["item-id"])
		btarget = data.find(b => b.id == `${request["btarget-id"]}`)
	delete bsource.item.splice(removedItemIdx, 1)
	btarget.item = request['btarget-items']
	res.send(data)
})

module.exports = router