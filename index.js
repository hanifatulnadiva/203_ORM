const express = require('express');
const app = express();
const db=require('./models');
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

.catch((err)=>{
    console.log(err);
})

app.post("/komik", async(req,res)=>{
    const data=req.body;
    try{
        const komik=await db.Komik.create(data);
        res.send(komik);
    }catch{
        res.send(err);
    }
});

app.get("/komik", async(req,res)=>{
    try{
        const komik =await db.Komik.findAll();
        res.send(komik);
    }catch(err){
        res.send(err);
    }
    
}); 

app.put('/komik',async(req,res)=>{
    const id=req.params.id;
    const data =req.body;
    try{
        const komik =await db.Komik.findByPk(id);
        if(!komik){
            return res.status(404).send({message:'komik tidak ditemukan'});
        }
        await komik.update(data);
        res.send({message:'komik berhasil di update', komik});

    }catch(err){
        res.status(500).send(err);
    }
});

app.delete('/komik', async(req,res)=>{
    const id=req.params.id;
    try{
        const komik =await db.Komik.findByPk(id);
        if(!komik){
            return res.status(404).send ({message:'komik tidak ditemukan'})
            
        }
        await komik.delete(data);
        res.send({message:'komik berhasil di hapus'});
    }catch(err){
        res.status(500).send(err);
    }

})