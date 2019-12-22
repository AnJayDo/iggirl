const express = require('express')
const router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('./public/db.json')
const db = low(adapter)

router.post('/addLink', async(req,res) => {
    try {
        db.get('links').push({link: `${req.body.link}`}).write()
        res.status(200).send(req.body.link)
    } catch(e) {}
})

router.post('/insertLink', async(req,res) => {
    try {
        const code=req.body.link
        const data=db.get('links').value().unshift({link: `${req.body.link}`})
        db.get('links').write()
        res.status(200).send(code)
    } catch(e) {
        console.log(e)
        res.status(400).send(e) 
    }
})

router.post('/addJSON', async(req,res) => {
    try {
        const data = JSON.parse(req.body.json).data.user.edge_saved_media.edges
        data.forEach(element => {
            db.get('links').push({link: `${element.node.shortcode}`}).write()
        });
        //console.log(db.get('links').__wrapped__.links.length)
        console.log(db.get('links').value().length)
        //db.get('link').push(req.body.).write()
        res.status(200).send(data)
    } catch(e) { 
        res.status(400).send(e) 
    }
})

module.exports = router