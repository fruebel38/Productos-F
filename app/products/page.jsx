'use client'

import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'

export default function Products() {
  const [prod, setProd] = useState(null)
  const supabase = createClient()

  const [search, setSearch] = useState('');

 useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('products').select()
      setProd(data)
    }
    getData()
  }, [])


  async function handleSearch(e) {
    e.preventDefault();
  
    const nameQuery = supabase
      .from('products')
      .select()
      .like('name', `%${search}%`);
  
    const descriptionQuery = supabase
      .from('products')
      .select()
      .like('description', `%${search}%`);
  
    const { data: nameData } = await nameQuery;
    const { data: descriptionData } = await descriptionQuery;
  
    const combinedData = [...nameData, ...descriptionData]; // Combina los resultados de ambas consultas
  
    setProd(combinedData);
  }

  
 
  

  return (
    <div className='my-6 flex min-h-screen flex-col items-center  p-3'>
      <h1 className='text-center text-4xl font-bold text-blue-600 mb-4 font-mono'>Mis productos</h1>
      <form className='mb-4' onSubmit={handleSearch}>
        <input
          type="text"
          placeholder='Buscar..'
          className='border rounded px-2 text-black'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

       <button 
        type='submit'
        className='bg-gray-300 rounded px-2 text-black m-2' >Buscar
        </button>

        <button className="bg-gray-300 rounded px-2 text-black m-2">
                        <a href="/products/add">Agregar Producto</a>
        </button>
      </form>
      

      {!prod || prod?.length === 0 ? <p>Ningún producto para mostrar</p> : null}

      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 font-serif mt-10 text-inherit '>
        {prod?.map((product) => 
        <div className='bg-blue-100 text-black text-bold px-3 py-3 m-3 rounded px-4'>
          <li key={product.id}></li>
          <strong>{product.name}</strong>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            

          
          </div>
        )}

      </ul>
    </div>
  );
}


/*import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function products() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: products } = await supabase.from('products').select()

 
  return(
    <div className=" h-screen">
    <div className="p-10 grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap4 list-decimal text-blue-500 font-bold">
      {products.map((product) => (
        <div key={product} className="mb-4">
          <div className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-500 font-semibold mt-2">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
 // return (
   // <ul class="list-decimal text-blue-500 font-bold">
//{products.map((product) => <li key={product.id}>{product.name} {product.price} {product.description}</li>)}
  //  </ul>
  //);
//}


//-----------------------------------Validaciones----------------------------------------------



*/
