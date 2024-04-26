"use client"

import { useEffect, useState } from "react"
import { getNote } from"../../actions";

export default function Page({ params }) {

 
    const [note, setNote] = useState({});

    useEffect(() => {
      const loadNote = async () => {
        const noteResult = await getNote(params.id);

        setNote(noteResult.notes)

        if(noteResult.error){
          alert(noteResult.error.message);
        }
      };
      loadNote();
    }, []);

  //return <div>Nota ID: {params.id} </div>

  return (
    <form>
      <input type="text" value={note?.title || ''} className="text-black"/>
    </form>
  )
}