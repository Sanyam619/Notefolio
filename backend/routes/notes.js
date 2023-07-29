const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// Route 1: Get all the notes using : GET "/api/notes/getallnotes"login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some errors occurred");
    }
})


// Route 2: Add a new note using : POST "/api/notes/addnote"  login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // if there are errors , return bad request and error messages
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save();
        res.json(savednote)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some errors occurred");
    }
})


// Route 3: Update an existing note using : PUT "/api/notes/updatenote"  login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title,description,tag} = req.body;

    //create a new note
    try {
    const newNote = {};
    if(title){
        newNote.title = title;
    }
    if(description){
        newNote.description = description;
    }
    if(tag){
        newNote.tag = tag;
    }

    // find the note to be updated
    let note =await Notes.findById(req.params.id);

    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json(note);
} catch (error) {
    console.log(error.message)
    res.status(500).send("Some errors occurred");
}
})


// Route 4: Delete an existing note using : DELETE "/api/notes/updatenote"  login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    // find the note to be deleted
    try {
    let note =await Notes.findById(req.params.id);

    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted", note:note});
} catch (error) {
    console.log(error.message)
    res.status(500).send("Some errors occurred");
}
})

module.exports = router;