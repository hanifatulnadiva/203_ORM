const express = require('express');
const app = express();
const db=require('/moduls');
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.listen(PORT,()=>{
    console.log ('server is running on port 3000')
})

db.sequelize.sync()
.then ((result)=>{
    app.listen(3000,()=>{
        console.log('server started');
    })
})
