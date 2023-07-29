import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";


const Notes = (props) => {
    const context = useContext(noteContext)
    let history = useHistory();
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if(localStorage.getItem('token')){
        getNotes()
        }
        else{
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refC = useRef(null)

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

    const updateNote = (currentnote) => {
        console.log("Updating");
        ref.current.click();
        setNote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    }

    const handleClick = (e) => {
        refC.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Updated Successfully","success")

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <Addnote showAlert={props.showAlert}/>

            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        aria-describedby="emailHelp"
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                        value={note.etitle}
                                    />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                        value={note.edescription}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                        value={note.etag}

                                    />
                                </div>
                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length < 5 || note.edescription.length < 5}>
                                    Add Note
                                </button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refC} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-2">
                {notes.length===0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes
