const User = require("../models/user");
const Item = require("../models/item").model;
const logger = require("../Utils/logger");
const axios = require("axios");

//important tag
//complete by
//reminder
//
var wallpaperUrls = {
    default_url_welcome:"https://images.unsplash.com/photo-1569402928543-87a35efc0606?ixid=Mnw5ODI5M3wwfDF8YWxsfHx8fHx8fHx8MTYyNDU5NzQyOA&ixlib=rb-1.2.1&fit=crop&q=80&w=1920&h=1080",
    default_url_todo:"https://images.unsplash.com/photo-1544220830-7da42df1ff8d?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjM4NjI3MTE&ixlib=rb-1.2.1&q=80&w=1920",
    default_url_sign:"https://images.unsplash.com/photo-1558904862-a276b092585c?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjUyNTEyNTA&ixlib=rb-1.2.1&fit=crop&q=80&w=1920&h=1080",
    url_welcome:"https://images.unsplash.com/photo-1569402928543-87a35efc0606?ixid=Mnw5ODI5M3wwfDF8YWxsfHx8fHx8fHx8MTYyNDU5NzQyOA&ixlib=rb-1.2.1&fit=crop&q=80&w=1920&h=1080",
    url_todo:"https://images.unsplash.com/photo-1544220830-7da42df1ff8d?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjM4NjI3MTE&ixlib=rb-1.2.1&q=80&w=1920",
    url_sign:"https://images.unsplash.com/photo-1558904862-a276b092585c?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjUyNTEyNTA&ixlib=rb-1.2.1&fit=crop&q=80&w=1920&h=1080"
}

exports.additem = (req, res) => {
    // console.log(req.user);
    let item = new Item({ title: req.body.title });
    User.findById(req.user._id, (err, user) => {
        if (!err) {
            user.items.push(item);
            user.save();
            res.json({ item });
        } else {
            logger.logError(err);
            res.status(401).json("Invalid User");
        }
    }).catch((err) => {
        logger.logError(err);
        res.status(500).json("Error! Item not added");
    });
};

exports.completeitem = (req, res) => {
    // console.log(req.user);
    let id = req.body.id;
    let d = req.body.checked ? 1 : 0;
    User.findById(req.user._id, (err, user) => {
        if (!err) {
            user.items.id(id).completed = d;
            user.save();
            res.status(200).json("Successful");
        } else {
            logger.logError(err);
            res.status(401).json("Invalid User");
        }
    }).catch((err) => {
        logger.logError(err);
        res.status(500).json("Error! Item not completed");
    });
};

exports.deleteitem = (req,res)=>{
    let id = req.body.id;
    User.findById(req.user._id,(err,user)=>{
        if(!err) {
            user.items.pull(id);
            user.save();
            res.status(200).json("Successful");
        }
        else
        {
            logger.logError(err);
            res.status(401).json("Invalid User");
        }
    }).catch((err) => {
        logger.logError(err);
        res.status(500).json("Error! Item not Deleted");
    });
};

setInterval(function () {
    ["sign","welcome","todo"].forEach(element=>{
        axios.get(process.env.UNSPLASH)
        .then(data=>{
            let url = data.data.urls.raw + "&fit=crop&q=80&w=1920&h=1080";
            console.log(url);
            console.log(wallpaperUrls[`url_${element}`]);
            wallpaperUrls[`url_${element}`] = url;
            console.log(wallpaperUrls[`url_${element}`]);
        })
        .catch(err=>{
            logger.logError(err);
        });
    })
}, 60*60*1000);

exports.getWallpaper = (req,res)=>{
    let req_page = req.query.page;
    if(wallpaperUrls[`url_${req_page}`]===undefined)
    res.status(200).send(wallpaperUrls[`default_url_${req_page}`]);
    else
    res.status(200).send(wallpaperUrls[`url_${req_page}`]);
}

exports.toggleImp = (req,res)=>{
    let imp_tag = req.body.imp_tag;
    let id  = req.body.id;
    User.findById(req.user._id,(err,user)=>{
        if(!err)
        {
            if(user)
            {
                user.items.id(id).important = imp_tag;
                user.save();
                res.status(200).json("Successfull");
            }
            else
            {
                res.status(401).json("Invalid User!");
            }
        }
        else{
            logger.logError(err);
            res.send(500).json("Item imp Tag not Updated!");
        }
    })
}

exports.setDueDate = (req,res)=>{
    let due_date = req.body.due_date;
    let id = req.body.id;
    User.findById(req.user._id,(err,user)=>{
        if(!err)
        {
            if(user)
            {
                user.items.id(id).due_date = due_date;
                user.save();
                res.status(200).json("Successfull");
            }
            else
            {
                res.status(401).json("Invalid User!");
            }
        }
        else
        {
            logger.logError(err);
            res.status(500).json("Item Due Date Not Updated");
        }
    })
}