'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState(null)


  const supabase = createClient()

  const router = useRouter();

  const [search, setSearch]= useState('');



  useEffect(() => {
    const getData = async () => {
      const { data: {session }} = await supabase.auth.getSession()
      if(!session){
        router.push('/login')
        return
      }
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

   function handleSearch(e){
     e.preventDefault();



     console.log("Buscar: ", search);

     const getData = async () => {
      const { data } = await supabase.
      from('notes')
      .select()
      .like('title', `%${search}%`);
      
      setNotes(data);//actualiza el estado: muestra resultados
    }
    getData()


   }


  return (
    <ul class="list-decimal text-blue-500 font-bold">

      <form
      className="my-6"
      onSubmit={handleSearch}
      
      
      >

       


        <input type="text"
          placeholder='Buscar...'
          className='border rounded px-2'
          defaultValue={search}
          onChange={(e) => {setSearch(e.target.value);}}

           />
    
      <button
      type='submit'
      className='rounded bg-blue-300 px-2 ml-3'
      >  
      Buscar
      </button> 
      </form>





      {!notes|| notes?.lenght == 0
        ?<p>Ninguna nota para mostrar</p>
        :null
      }
      {notes?.map((note) => <li key={note.id}>{note.title}</li>)}
    </ul>
  );
}