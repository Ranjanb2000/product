const { name } = require('ejs');
const express = require('express');
const mongoose=require('mongoose');
const app = express();
const port = 8000;
app.use(express.json());
// it is used to connect the database
mongoose.connect('mongodb://127.0.0.1:27017/authenticate');

const db = mongoose.connection;

// if it is fails to connect then this below one line code executes
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// upon successfull connection to database this below line will executes
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});



app.use(express.urlencoded());
//the below code tells about document schema of the product  
const productSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required:true
        
        
    },
    quantity: {
        type:Number,
        required:true
        
    }
    
    
},{
    timestamps: true // This is for created and update and in schema
});

const Product = mongoose.model('Product', productSchema);
// below code is used to add the data to the database
app.post('/products/create',async function(req,res)
{
    try
    {
        console.log('hkjg',req.body.name);
        let product=await Product.create({
            name:req.body.name,
            quantity:req.body.quantity
        })
        console.log(product);
        return res.json(product);
    }
    catch(err)
    {
        console.log(err);
    }
});
// this function is used to find all the documents in the database
app.get('/products/',async function(req,res){
    let products = await Product.find({})
        .sort('-createdAt');

    return res.json(200, {
        message: "List of posts",
        products: products
    })
});
// this function is used to delerte all the documents in the database
app.delete('/products/:id',async function(req,res){
    try{
        let product = await Product.findById(req.params.id);
            await Product.findByIdAndDelete(product._id);


    
            return res.json(200, {
                message: "product deleted successfully!"
            });
        
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
});
// this function is used to update the existing document using object_id in the database
app.put('/products/:id/update_quantity/',async function(req,res){
    
    try{
        let product=await Product.findByIdAndUpdate(req.params.id,{
        quantity:req.query.number
    });
    return res.json(200, {
        message: "updated successfully",
        product: product
    })
}
    
    catch(err)
    {
        console.log(err);
    }
})

// this function is used to connect to the server.
app.listen(port, function(err){
    if(err){
        console.log(`Error in running Server, ${err}`); 
    }
    console.log(`Server is running on port: ${port}`);
})
