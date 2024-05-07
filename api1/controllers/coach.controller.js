import Coach from "../models/coach.model.js";

app.get('/',(req, res) => {
    Coach.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    Coach.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) =>{
    const id = req.params.id;
    Coach.findByIdAndUpdate({_id: id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
        cname:req.body.cname,
        date:req.body.date,
        time:req.body.time,
        msg:req.body.msg
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id',(req, res) => {
    const id = req.params.id;
    Coach.findByIdAndDelete({_id: id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/createUser", (req, res) => {
    Coach.create(req.body)
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.listen(3000, () => {
    console.log("Server is Runinig")
})
