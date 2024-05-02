const express=require('express')
const { createContact,deleteContact,updateContact, viewContact } = require('../controllers/indexController')
const router = express.Router()

router.post('/create',createContact)

router.get('/viewcontacts',viewContact)

router.put('/updatecontact/:id', updateContact);

router.delete('/deletecontact/:id', deleteContact);


module.exports=router