'use client'
import { useEffect, useState } from 'react';
import { getProductById, updateProduct } from './actions.js';
import Link from 'next/link.js';

const EditProductPage = ({ params }) => {
    const id = params.id
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);


    const [updatedProduct, setUpdatedProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(id);
                setProduct(product);
                setUpdatedProduct(product);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(updatedProduct);
            alert("Producto editado correctamente");
            window.location.href = "/products";
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div
            className='h-full'>
            <div className="mt-4 justify-center">
                <div className='mt-5px'>
                    <h1
                        className='text-2xl text-center font-bold text-white mb-4'>
                        Editar Producto {id}
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div
                        className='mb-4'>
                        <label class="block text-sm font-medium text-gray-600" for="descripcion">Nombre:</label>
                        <input
                            className="text-black mt-1 p-2 w-full border rounded-md"
                            type="text"
                            name="name"
                            value={updatedProduct.name}
                            onChange={handleInputChange} />
                    </div>

                    <div
                        className='mb-4'>
                        <label class="block text-sm font-medium text-gray-600" for="descripcion">Descripción:</label>
                        <input
                            className="text-black mt-1 p-2 w-full border rounded-md"
                            type="text"
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleInputChange} />
                    </div>
                    <div
                        className='mb-4'>
                        <label class="block text-sm font-medium text-gray-600" for="descripcion">Precio:</label>
                        <input
                            className="text-black mt-1 p-2 w-full border rounded-md"
                            type="number"
                            name="price"
                            value={updatedProduct.price}
                            onChange={handleInputChange} />
                    </div>
                    
                    <div className="flex mt-4 md:mt-6 posi">
                        <button
                            className="bg-blue-300 rounded px-2 text-black m-2"
                        >
                            Guardar
                        </button>
                        <Link
                            href="/products2"
                            className="bg-blue-300 rounded px-2 text-black m-2"
                        >
                            Volver
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default EditProductPage;