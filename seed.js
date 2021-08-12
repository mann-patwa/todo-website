const Todo = require('./schema')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(' database connected')
});


const a = new Todo({
    name: 'test',
    description: 'this is the test todo'

})

async function yo (){
    a.save()
    .then(() => {
        console.log('saved')
    })
    .catch((err) => {
        console.log('error', err)
    })
}
yo()
