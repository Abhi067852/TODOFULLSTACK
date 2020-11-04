//jshint esversion :6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const url = "mongodb+srv://Abhishek:<password>@gettingstarted.bsmia.mongodb.net/TodoList?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
const itemsSchema = {
    name: String

};
const Item = mongoose.model("Item", itemsSchema);
const task1 = new Item({
    name: "Welcome "
});


const defaultTask = [task1];




var lists = [];
app.get("/", function (req, res) {
    // res.sendFile(__dirname + "/index.html");
    Item.find({}, function (err, found) {
        if (err) {
            console.log("Error Found");
        }
        else {
            if (found.length == 0) {
                Item.insertMany(defaultTask, function (err) {
                    if (err) {
                        console.log("Error Found");
                    }
                    else {
                        console.log("all good");
                    }
                })
                res.redirect("/");


            }
            else {
                res.render('list', { status: "today", newlist: found })
            }
        }

    })

})
var worklist = [];
app.post("/", function (req, res) {
    var list = req.body.Task;
    if (req.body.list == "work") {
        console.log(req.body.Task);
        worklist.push(list);
        res.redirect("/work");
    }
    else {
        if (req.body.delTask == "del") {
            var i = req.body.index;
            var id;
            Item.find({}, function (err, found) {
                if (err) {
                    console.log("Error Found");
                }
                else {
                    id = found[i - 1]._id;
                    console.log(id);
                    Item.findByIdAndRemove(id, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            // res.redirect("/");
                            console.log("success");
                        }
                    })
                    res.redirect("/");



                }
            })





        }
        else {


            // lists.push(list);
            const task = new Item({
                name: list
            })
            task.save(function (err, Item) {
                if (err) {
                    console.log("Error Found");
                }
                else {
                    console.log(Item);
                    console.log("success  ");
                }
            })
            // res.send("Done");
            res.redirect("/");
        }
    }
}
)
app.get("/work", function (req, res) {
    res.render("list", { status: "work", newlist: worklist })
})


let port = 3000 || process.env.PORT;
app.listen(port, function () {
    console.log("Iam Listening ");
})