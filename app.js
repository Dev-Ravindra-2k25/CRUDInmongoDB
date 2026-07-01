const express = require("express");
const path = require("path");
const User = require("./models/user");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Home Page (Display Users)
app.get("/", async (req, res) => {
    const users = await User.find();
    res.render("index", { users });
});

// Create User Page
app.get("/create", (req, res) => {
    res.render("create");
});

// Create User
app.post("/create", async (req, res) => {
    const { name, username, email,image } = req.body;

    await User.create({
        name,
        username,
        email,
        image
    });

    res.redirect("/");
});

// Open Edit Page
app.get("/edit/:id", async (req, res) => {

    const user = await User.findById(req.params.id);

    res.render("edit", { user });

});

// Update User
app.post("/update/:id", async (req, res) => {

    const { name, image, email } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
        name,
        image,
        email
    });

    res.redirect("/");

});

app.get("/delete/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/");
});


app.listen(3000, () => {
    console.log("Server Started and working fine");
});