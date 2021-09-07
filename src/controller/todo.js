const User = require("../models/user");
const Item = require("../models/item").model;
const logger = require("../Utils/logger");
const axios = require("axios");

//important tag
//complete by
//reminder
//
var presentWallpaper ={
    'DEFAULTDEFAULT':1,
'DEFAULTFEDAULT':1,
'DEFAULTDEFATLU':1,
'sovz0DK5ynI':1,
'-pHHVcxNbq0':1,
'4TVbbaNAw9Q':1,
'sa4TE0-MrOw':1,
'7XbxPUdRtgw':1,
'onYwpkAI8ow':1,
'lpjshIWEnDM':1,
'z0l-3cWpKto':1,
'tKs_2sBoqAg':1,
'UQXF_w83Z5s':1,
'XOEL0hNDub0':1,
'x1pvYTFmbdI':1,
'kvqgrvOacm4':1,
'BSdKLz57Eag':1,
}
var wallpapers = [
    {
        id: 'DEFAULTDEFAULT',
        urls: {
          raw: 'https://images.unsplash.com/photo-1569402928543-87a35efc0606?ixid=Mnw5ODI5M3wwfDF8YWxsfHx8fHx8fHx8MTYyNDU5NzQyOA&ixlib=rb-1.2.1'
        }
      },{
        id: 'DEFAULTFEDAULT',
        urls: {
          raw: 'https://images.unsplash.com/photo-1544220830-7da42df1ff8d?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjM4NjI3MTE&ixlib=rb-1.2.1'
        }
      },{
        id: 'DEFAULTDEFATLU',
        urls: {
          raw: 'https://images.unsplash.com/photo-1558904862-a276b092585c?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjUyNTEyNTA&ixlib=rb-1.2.1'
        }
      },
    {
      id: 'sovz0DK5ynI',
      urls: {
        raw: 'https://images.unsplash.com/photo-1597302520641-6c95c8023e1c?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: '-pHHVcxNbq0',
      urls: {
        raw: 'https://images.unsplash.com/photo-1621184315241-2f8eebaaa6a1?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: '4TVbbaNAw9Q',
      urls: {
        raw: 'https://images.unsplash.com/photo-1553773077-91673524aafa?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: 'sa4TE0-MrOw',
      urls: {
        raw: 'https://images.unsplash.com/photo-1541442510208-33bf9a34886f?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: '7XbxPUdRtgw',
      urls: {
        raw: 'https://images.unsplash.com/photo-1572270907014-c31da1c54124?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: 'onYwpkAI8ow',
      urls: {
        raw: 'https://images.unsplash.com/photo-1556827739-8cdac8bc6855?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: 'lpjshIWEnDM',
      urls: {
        raw: 'https://images.unsplash.com/photo-1569165421848-abaf704e735a?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: 'z0l-3cWpKto',
      urls: {
        raw: 'https://images.unsplash.com/photo-1580145035805-66b9b1669835?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: 'tKs_2sBoqAg',
      urls: {
        raw: 'https://images.unsplash.com/photo-1517976384346-3136801d605d?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: 'UQXF_w83Z5s',
      urls: {
        raw: 'https://images.unsplash.com/photo-1543739970-9f00688c2285?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: 'XOEL0hNDub0',
      urls: {
        raw: 'https://images.unsplash.com/photo-1546417492-dcfe1fbb6669?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: 'x1pvYTFmbdI',
      urls: {
        raw: 'https://images.unsplash.com/photo-1599014954148-ca560ffea964?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: 'kvqgrvOacm4',
      urls: {
        raw: 'https://images.unsplash.com/photo-1601202786213-8aeec3445a28?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    },
    {
      id: 'BSdKLz57Eag',
      urls: {
        raw: 'https://images.unsplash.com/photo-1593462131651-9f3d58eecd9e?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzA5MjgxNzI&ixlib=rb-1.2.1'
      }
    }
  ];
var index = 0;
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
        // axios.get(process.env.UNSPLASH)
        // .then(data=>{
        //     let url = data.data.urls.raw + "&fit=crop&q=80&w=1920&h=1080";
        //     console.log(url);
        //     console.log(wallpaperUrls[`url_${element}`]);
        //     wallpaperUrls[`url_${element}`] = url;
        //     console.log(wallpaperUrls[`url_${element}`]);
        // })
        // .catch(err=>{
        //     logger.logError(err);
        // });
        wallpaperUrls[`url_${element}`] = wallpapers[index].urls.raw + "&fit=crop&q=80&w=1920&h=1080";
        // console.log(wallpapers[index].urls.raw + "&fit=crop&q=80&w=1920&h=1080");
        // console.log(wallpapers.length)
        if(index==wallpapers.length-1)
            index = 0;
        else
            index = index+1;
    })
}, 60*60*1000);

exports.getWallpaper = (req,res)=>{
    let req_page = req.query.page;
    if(wallpaperUrls[`url_${req_page}`]===undefined)
    res.status(200).send(wallpaperUrls[`default_url_${req_page}`]);
    else
    res.status(200).send(wallpaperUrls[`url_${req_page}`]);
}
exports.getAdminWallpaper =(req,res)=>{
  let count = req.body.count;
  let query = req.body.query;
  let url = process.env.UNSPLASH +"&"  + `count=${count}`;

  if(!(query=="" || query==null || query==undefined))
    url = url +"&" + `query=${query}`;
  
  axios.get(url).then(
    data=>{
      let imagesAndUrl = data.data.map(image=> ({id:image.id, urls:{raw:image.urls.raw,regular:image.urls.regular}}))
      res.status(200).json(imagesAndUrl)
    }).catch(err=>{
      logger.logError(err);
      res.status(500).json("Error Occured");
    })
}

exports.adminWallpaper =(req,res)=>{
    let images = req.body.images;
    if(images!= [] && images!=null && images!=undefined)
    {
        images.forEach(image=>{
        if(presentWallpaper[image.id]==undefined)
        {
            presentWallpaper[image.id] = 1;
            wallpapers.push(image);
        }})
        res.status(200).send("Success");
    }
    else
    {
        res.status(500).send("Not Success");
    }
    // console.log(wallpapers);
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