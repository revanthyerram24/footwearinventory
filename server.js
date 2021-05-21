var express=require("express")
var app=express()
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const  json  = require("body-parser");

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'footwearinventory';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var db;
var __dirname="C:/Users/sai revanth/OneDrive/Desktop/project"
MongoClient.connect(url,(err,client)=>{
    if(err) return console.log("console.error();");
    db=client.db("footwearinventory");  
})
app.get("/",(req,res)=>{
    db.collection('stock').find().toArray((err,result)=>{
        if(err) res.send("hello")
        console.log(result)
        res.render(__dirname+'/'+'home.ejs',data=result);
    })
})
app.get('/update',(req,res)=>{
    res.render(__dirname+'/'+'updatestock.ejs')
})
app.post('/update',(req,res)=>{
    var id1=req.body.id
    var stocks=parseInt(req.body.add)
    var to_be_added=0;
    db.collection('stock').find().toArray((err,result)=>{
    
       if(err) res.send("hello")
       console.log(result)
           
        for(var i=0;i<result.length;i++){
            if(result[i].id==id1){
                to_be_added=parseInt(result[i].quantity)
                console.log(to_be_added+"  "+typeof(to_be_added))
            }
        }
        var ans=to_be_added+stocks
        console.log(ans)
        db.collection("stock").update({'id':id1 },{$set:{'quantity':ans}})
      //  db.collection.update({"id":"id1"},$set:({"quantity":"ans"}))
    })
    res.redirect("/")
})
app.get('/delete',(req,res)=>{
    res.render(__dirname+'/'+'deletestock.ejs')
})
app.post('/delete',(req,res)=>{
    var id1=req.body.id
    console.log(id1);
    db.collection("stock").remove({"id":id1})
    res.redirect("/")
})
app.get('/addproduct',(req,res)=>{
    res.render(__dirname+'/'+'new_product.ejs')
})
app.post('/addproduct',(req,res)=>{

    console.log(req.body);
    db.collection("stock").insert(req.body)
    res.redirect("/")
})

app.listen(5000)