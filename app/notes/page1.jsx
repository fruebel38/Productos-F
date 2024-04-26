

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function notes () {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)



  const [search, setSeart] = useState('');
  
  //query que lee todos los registros de la tabla:notes
  const { data: notes,error } = await supabase.from('notes').select()

  console.log(error);

  return (
    <ul class="list-decimal text-blue-500 font-bold">

      <form >
        <input type="text"
          placeholder='Buscar...'
           />
      </form>

      <button
      type='submit'
      className='rounded bg-blue-300'>
        
        Buscar
      </button>




      {!notes|| notes?.lenght == 0
        ?<p>Ninguna nota para mostrar{!!error? error.message: ''}</p>
        :null
      }
      {notes?.map((note) => <li key={note.id}>{note.title}</li>)}
    </ul>
  );
}