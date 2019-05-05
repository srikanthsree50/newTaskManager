
const {MongoClient,ObjectID} =require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID()
console.log(id.id);

MongoClient.connect(connectionUrl,{ useNewUrlParser:true }, (error,client) => {
if(error){
    console.log('cannot connect to database....')
}


console.log('connected successfully....')

const db = client.db(databaseName);

/////////////////////////////////////////////////////////////READING DATA

// db.collection('users').findOne({name:'srikanth goud'},(err,result) => {
//     if(err){
//         return console.log(err);
//     }
//     console.log(result);
// })

////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////CREATING DATA
// db.collection('users').insertOne({
//     name:'srikanth goud',
//     age:31
// },(err,result) => {
//     if(err){
//         return console.log(err);
//     }
//     console.log(result.ops);
// })

//////////////////////////////////////////////////////////

// db.collection('tasks').insertMany([
//         {
//     description:'coding time',
//     completed:true
// },{
//     description:'raining home',
//     completed:false
// }

// ],(err,result) => {
//       if(err){
//            return console.log(err);
//        }
//        console.log(result.ops);
// })

/////////////////////////////////////////////////////UPDATING DATA//////////

// db.collection('users').updateOne({
//     _id: new ObjectID('5cbc4c87cb21c5109098b42f')
// },{
//     $set:{
// name: 'krishh'
//     }
// }).then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })

////////////////////////////////////////////////////////DELETING DATA


db.collection('users').deleteMany({
    _id: new ObjectID('5cbc4c87cb21c5109098b42f')
}).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})


})


