const express = require('express');
const router = express.Router();//When you use Router() for routing then you should use middleware in index.js to use this routes
//That middleware is nothing but use()

//Item model
const Item = require('../../model/Item');

//Routes

router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })//This means order by date and -1 means desc
        .then(items => res.json(items));
})


router.post('/', (req, res) => {
    // let item = new Item(req.body); OR
    let item = new Item({
        name: req.body.name
    });
    item.save()
        // .then(item => res.send(item))
        .then(success => {
            res.status(200).json({ 'success': 'Item Added Successfully' });
        })
        .catch(err => {
            res.status(400).send("Something Went Wrong");
        });
})

router.delete('/:id', function (req, res, next) {
    const id = req.params.id;

    Item.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Item was not found!`
                });
            } else {
                res.send({
                    message: "Item was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Item with id=" + id
            });
        });
});
module.exports = router;
