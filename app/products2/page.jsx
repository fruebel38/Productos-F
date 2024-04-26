'use client'
import {createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react';
import { getProducts, searchProducts } from './actions.js'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter()
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState('');
    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {
            const productsResult = await getProducts();
            setProducts(productsResult.products);
            if (productsResult.error) {
                alert(productsResult.error.massage);
            }
            const { data: {session }} = await supabase.auth.getSession()
            if(!session){
              router.push('/login')
              return
            }
        }

      
        getData()
    }, []);

    function handleSearch(e) {
        e.preventDefault(); 
        console.log("buscar: ", search);

        const getData = async () => {
            const productsResult = await searchProducts(search);
            setProducts(productsResult.products)
            if (productsResult.error) {
                alert(productsResult.error.message);
            }
        }
        getData()
    }


    return (
        <div className="h-full">
             <h1 className='text-center text-4xl font-bold text-blue-600 mb-4 font-mono'>Mis productos</h1>
            <div className="mt-4 flex justify-center">
                <form
                    className="mb-4"
                    onChange={handleSearch}>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="bg-gray-300 rounded px-2 text-black m-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button 
                        type='submit'
                        className='bg-gray-300 rounded px-2 text-black m-2' >Buscar
                    </button>
                </form>
                <div className="flex mb-4 ml-6">
                    <button
                        className="bg-gray-300 rounded px-2 text-black m-2"
                    >
                        <a href="/products2/add">Agregar Producto</a>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 font-serif mt-10 text-inherit">
                {products?.map((product) => (
                    <div >
                        <ul>
                            <li key={product.id}>
                            </li>
                        </ul>
                        <div>
                            <div>
                                <div></div>
                            </div>
                            <div className="bg-blue-100 text-black text-bold px-3 py-3 m-3 rounded px-4">
                                <p>
                                    {product.name}
                                </p>
                                <p >
                                    {product.description}
                                </p>
                                <p>
                                    ${product.price}
                                </p>
                                <div className="flex mt-4 md:mt-6">
                                    <Link
                                        className="bg-blue-300 rounded px-2 text-black m-2"
                                        href={`/products2/edit/${product.id}`}>
                                        Editar
                                    </Link>
                                
                                 </div>
                            </div>
                        </div>
                        
                    </div>
                )

                )}
            </div>
        </div>
    )

}