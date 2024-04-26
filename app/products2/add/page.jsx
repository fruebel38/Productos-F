"use client"

import { useState } from "react";
import { addProduct } from './action';

export default function AddProduct() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});


    function onSave(form) {
        form.preventDefault();

        let errorsList = {};

        !name ? errorsList.name = "El nombre es obligatorio"
            : '';

        !description ? errorsList.description = "La descripcion es obligatoria"
            : '';

        !price ? errorsList.price = "El precio es obligatorio"
            : '';

        !category ? errorsList.category = "La categoria es obligatoria"
            : '';


        addProduct({
            name,
            description,
            price,
            category,
        })
            .then((result) => {
                console.log(result);

                if (!result.success) {
                    alert(result.message);
                    setErrors({ ...result.errors });
                } else {
                    alert(result.message);
                    setName('');
                    setDescription('');
                    setPrice('');
                    setCategory('');
                    window.location.href = '/products2';
                }

            })
            .catch((error) => {
                alert(error.message);
            });

    }

    return (
        
    
                    
                

            
            <div class="mb-4" onSubmit={onSave}>
        
     <form method="POST">
            <button
                        className='bg-gray-300 rounded px-2 text-black m-2' >
                        <a href="/products2">Volver</a>
            </button>
     <h2 className="text-2xl text-center font-bold text-white mb-4">Agregar Nuevo Producto</h2>
        <label class="block text-sm font-medium text-gray-600" for="nombre">Nombre:</label>
        <input 
            type="text"  class="text-black mt-1 p-2 w-full border rounded-md" id="nombre" name="nombre" value={name}
            onChange={(e)=>{
            setName(e.target.value)
            setErrors({
                ...errors,
                name: undefined,
                });
            }}/>

                <p className="text-red-800">{errors.name || ''}</p>


        <label class="block text-sm font-medium text-gray-600" for="precio">Precio:</label>
        <input 
             type="text" class="text-black mt-1 p-2 w-full border rounded-md" id="precio" name="precio" 
            value={price}
            onChange={(e)=>{
            setPrice(e.target.value)
            setErrors({
                ...errors,
                price: undefined,
                });
            }}/>
                     <p className="text-red-800">{errors.price || ''}</p>


        <label class="block text-sm font-medium text-gray-600" for="descripcion">Descripción:</label>
        <input 
                type="text"class="text-black mt-1 p-2 w-full border rounded-md" id="descripcion" name="descripcion" 
                 value={description}
                onChange={(e)=>{
                setDescription(e.target.value)
                setErrors({
                    ...errors,
                    description: undefined,
                    });
                }}/>

                 <p className="text-red-800">{errors.description || ''}</p>

            <button className='bg-gray-300 rounded px-2 text-black m-2'  type="submit"> Enviar</button> 
            
                    
        </form>
</div>
        
    )
}