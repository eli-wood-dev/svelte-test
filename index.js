import express from "express";
import cors from "cors";

const port = 8080;

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

const people = [
    {
        "name": "cody"
    },
    {
        "name": "eli"
    },
    {
        "name": "zach"
    }
];

app.use(express.json());

app.get("/people", (req, res)=>{
    const {name} = req.query;

    if(!name){
        return res.status(200).send(people);
    }

    const person = people.find(person=>person.name.includes(name));

    if(!person){
        return res.status(404).send("Person Not Found")
    }

    return res.status(200).send([person])
})

app.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
})