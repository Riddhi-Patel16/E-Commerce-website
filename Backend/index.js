import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import cors from 'cors'
import dotenv from 'dotenv';
import { log } from 'console';
import { type } from 'os';

dotenv.config();
const port = process.env.PORT || 4000;
let app=express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
app.get('/',(req,res)=>{
    res.send("Express is running")
})

const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avialable:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id2=1;
    if(products.length>0)
    {
        let last_product_object=products.slice(-1)[0];
        let last_id=last_product_object.id;
        id2=last_id+1;
    }
    const product=new Product({
        id:id2,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:1,
        name:req.body.name,
    })
})


const Users=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    },
    cartData:{
        type:Object,
    },
    Date:{
        type:Date,
        Default:Date.now,
    }
})


app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"Existing use found with same email id"})
    }
    let cart={};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save();

    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,process.env.JWT_SECRET);
    res.json({success:true,
        token:token
    })
})

app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user)
    {
        const passcompare=req.body.password===user.password;
        if(passcompare)
        {
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,process.env.JWT_SECRET);
            res.json({
                success:true,
                token:token
            })
        }
        else
        {
            res.json({success:false,error:"Wrong Password"});
        }
    }
    else
    {
        res.json({success:false,errors:"Wrong Email id"});
    }
})


app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success:1,
        name:req.body.id
    })
})

app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    console.log("Allproduct fetched");
    res.json({
        success:1,
        products:products
    })
})

const upload=multer({storage:storage})
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


app.listen(port,()=>{
    console.log("Server is running on port 4000");
})
