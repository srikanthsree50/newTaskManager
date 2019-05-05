const auth = require('..//moddleware/auth')
const express = require('express');
const User = require('../models/user');
const multer = require('multer');
const { sendWelcomeEmail,sendCancelationEmail }= require('../emails/account')

const router = new express.Router();


router.get('/users/me', auth , async (req,res) => {
 
    res.send(req.user);
})


router.post('/users', async (req,res) => {
     
    const user =  new User(req.body);
  
  try
   {
  
  await user.save()
 sendWelcomeEmail(user.email,user.name)
  const token = await user.generateAuthToken()

  res.status(200).send({user,token})
  
  }
  catch(e) {
  res.status(400).send(e)
  }
  
  })
  
  router.post('/users/login', async (req,res) => {
try{

const user = await User.findByCredentials(req.body.email,req.body.password)
const token = await user.generateAuthToken()
res.send({user,token})
}
catch(e){
res.status(400).send()
}
  })

router.post('/users/logout', auth, async (req,res) => {
    try{

req.user.tokens = req.user.tokens.filter((token) => {
    return token.token !== req.token
})
await req.user.save()
res.send()
    }

    catch(e){
res.status(500).send()
    }
})

router.post('/users/logoutAll' , auth , async (req,res) => {
    try{
req.user.tokens = []
await req.user.save()
res.send()
    }
    catch(e){
res.status(500).send()
    }
})

  router.patch('/users/me', auth , async (req,res) => {

const updates = Object.keys(req.body);
const allowedUpdates = ['name','email','password','age'];
const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

if(!isValidOperation){
    return res.status(400).send({error:'invalid updates'})
}

try {


    updates.forEach((update) => req.user[update] = req.body[update])

await req.user.save()

  // const user = await User.findByIdAndUpdate(req.params.id,req.body, { new : true, runValidators:true});

res.send(req.user)
}
catch(e){
res.status(404).send(e)
}

})

router.delete('/users/me', auth , async (req,res) => {

    try {
    
    await req.user.remove()
    sendCancelationEmail(req.user.email,req.user.name)
    res.send(req.user)
    }
    catch(e){
    res.status(500).send(e)
    }
})    



const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb)
    {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
    {
  return  cb(new Error('invalid file format upload Jpg Jpeg or Pngs only'))
    }

 cb(undefined,true)

    }
 })
 
 router.post('/users/me/upload', auth ,upload.single('upload'), async (req,res) => {
  
  req.user.upload = req.file.buffer
  await req.user.save()
    res.send()
}, (error,req,res,next) => {
    res.status(400).send({error:error.message})
})

router.delete('/users/me/upload' , auth ,async (req,res) => {
req.user.upload = undefined
await req.user.save()
res.send()
})



router.get('/users/:id/upload',async (req,res) => {
    try{

 const user = await User.findById(req.params.id)

if(!user | !user.upload){
    throw new Error()
}
res.set('Content-Type','image/jpg')
res.send(user.upload)
    }
    catch(e){
        res.status(404).send()
    }
})



module.exports = router;