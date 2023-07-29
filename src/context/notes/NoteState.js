import React,{ useState } from 'react'
import noteContext from './noteContext'

const NoteState =  (props) =>{
    const  host = "http://localhost:5000"
    const initialNotes = []

      const [notes, setNotes] = useState(initialNotes)


      // Get all notes
      const getNotes =async ()=>{

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
          },
        });
        const json= await response.json();
        setNotes(json);
        console.log(json);
      }

      // Add a note
      const addNote =async (title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
        });
        const note=await response.json();
        setNotes(notes.concat(note))
      }

      // delete a note
      const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
          }
        });
        const json= response.json();
        console.log(json);
        console.log("deleting with id "+id);
        const newNotes = notes.filter((note)=>{
         return note._id!==id;
        })
        setNotes(newNotes)
      }

      //edit a note
      const editNote = async(id,title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
        });
        const json=await response.json();
        console.log(json);



        let newNotes = JSON.parse(JSON.stringify(notes))


        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
          break;

          }
        }
        setNotes(newNotes);
      
      }
    return(
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )

    }
export default NoteState;