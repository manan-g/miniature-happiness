const express = require("express");
const { check_auth } = require("../controller/auth");
const { additem, completeitem, deleteitem, getWallpaper, setDueDate, toggleImp } = require("../controller/todo");
const router = express.Router();

//title: req.body.title -> MongoDb item document
// 200: item, 401: invalid User, 500: Error! Item not added
router.post("/additem", check_auth, additem);

//id: req.body.id (item id), req.body.checked -> set the complete tag
//200: successful, 401: invalid User, 500: Error! Item not completed
router.post("/completeitem", check_auth, completeitem);

//id: req.body.id (item id) -> delete the item
//200: successful, 401: invalid User, 500: Error! Item not deleted
router.post("/deleteitem",check_auth,deleteitem);

//req_page = req.query.page (concerned page) -> return the background url of that page
//200: url
router.get("/getwall",getWallpaper);

//id: req.body.id (item id), imp_tag = req.body.imp_tag -> set the important tag
//200: successful, 401: invalid User, 500: Error! Item imp Tag not completed
router.post("/setimptag",check_auth,toggleImp);

//id: req.body.id (item id), due_date = req.body.due_date -> set the due date of that item
//200: successful, 401: invalid User, 500: Item Due Date Not Updated
router.post("/duedateitem",check_auth,setDueDate);

module.exports = router;

