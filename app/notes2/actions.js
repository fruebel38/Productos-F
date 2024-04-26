"use server"

import { createClient } from '@/utils/supabase/server'
import { create } from 'domain';
import { cookies } from 'next/headers'


function supabaseClient (){

    const cookieStore = cookies();
    return createClient(cookieStore);


}
export async function getNotes(){
//Crear cliente supabaese

    const{ data: notes, error } = await supabaseClient()   //llamar directamente la funcion
    .from('notes')
    .select();


    return{
        notes,
        error,
    };


}
//función para buscar/filtrar notas
export async function searchNotes(search){

    //conservar instacia de supabese
    //asi podemos usar al cliente las veces que sea necesario   
    
    const supabase = supabaseClient();
    

    const { data: notes, error} = await supabase.
    from('notes')
    .select()
    .like('title', `%${search}%`);

    return{
        notes,
        error,
    };

}

//función para leer una nota por id
export async function getNote(id){
    const supabase = supabaseClient();
  
    const { data, error} = await supabase
    .from('notes')
    .select()
    .eq('id', id)
    .single();
  
    return({
      notes: data,
      error,
    });
  }
  

