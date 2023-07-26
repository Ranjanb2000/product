const { name } = require('ejs');
const express = require('express');
const mongoose=require('mongoose');
const app = express();
const port = 8000;
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/authenticate');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});



app.use(express.urlencoded());
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
app.get('/products/',async function(req,res){
    let products = await Product.find({})
        .sort('-createdAt');

    return res.json(200, {
        message: "List of posts",
        products: products
    })
});

app.delete('/products/:id',async function(req,res){
    try{
        let product = await Product.findById(req.params.id);

        // if (post.user == req.user.id){
            

           
            await Product.findByIdAndDelete(product._id);


    
            return res.json(200, {
                message: "product deleted successfully!"
            });
        // }else{
        //     req.flash('error', 'You cannot delete this post!');
        //     return res.redirect('back');
        // }

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
});

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






app.listen(port, function(err){
    if(err){
        console.log(`Error in running Server, ${err}`); // interpolation
    }
    console.log(`Server is running on port: ${port}`);
})