const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    let medicines = await db.myQuery("SELECT * FROM dex");
    res.send(medicines);
});

app.get("/:id", async (req, res) => {
    let medicine = await db.myQuery(
        `SELECT * FROM dex WHERE dex.id = ${req.params.id}`
    );
    res.send(medicine);
});

app.post("/", async (req, res) => {
    let data = req.body;
    await db.myQuery(
        `INSERT INTO dex VALUES (DEFAULT, '${data.name}', ${data.price}, ${data.value}, '${data.descr}', '${data.company_id}')`
    );
    res.send("medicine posted :)");
});

app.get("/comments", async (req, res) => {
    let comments = await db.myQuery("SELECT * FROM comment");
    res.send(comments);
});

app.post("/comment/:id", async (req, res) => {
    let data = req.body;
    await db.myQuery(
        `INSERT INTO comment VALUES (DEFAULT, '${data.email}', '${data.comment}', '${req.params.id}')`
    );
    res.send("Comment posted :)");
});

app.get("/search/:text", async (req, res) => {
    let medicines = await db.myQuery(
        `SELECT * FROM dex WHERE name LIKE '${req.params.text}%'`
    );
    res.send(medicines);
});

app.listen(5000);
