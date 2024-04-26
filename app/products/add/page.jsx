
"use client"
import { useState } from "react";
import {addProduct} from './actions';
//import { Result } from "postcss";
//import { error } from "console";

export default function AddProduct(){


const [name,setName] = useState('');
const [price,setPrice] = useState('');
const [description,setDescription] = useState('');
//se conservan errores, si es que hay.
const [errors,setErrors]=useState('');


console.log(name);
function onSave(form){
    form.preventDefault();
    console.log('default');

 /*let errorsList = {};

    if(!name){
        errorsList.name='el nombre es obligatorio';
      //alert('name no tiene valor');
        //setErrors({...errors,
        //name:'el nombre es obligatorio'
        //});
    
    }

    if(!precio){
        errorsList.precio='El precio es obligatorio';
    }else {
            const validPrecio = precio.match("^[0-9]+$");
            if(!validPrecio){
                errorsList.precio = "El precio debe ser un numero";
            }
    }
       // alert('descripcion no tiene valor')
        //setErrors({...errors,
          //  descripcion:'descripcion es obligatorio'
            //});


    if(!descripcion){
        errorsList.descripcion ='La descripcion es obligatorio';
       // alert('descripcion no tiene valor')
        //setErrors({...errors,
          //  descripcion:'descripcion es obligatorio'
            //});
    
      }

      
      //pasr la lista de errores a estado
      setErrors({...errorsList});


     //si hay mensaje de error interrumpir el flujo
      if(Object.keys(errorsList).length > 0){
        return;
      }
    */
console.log('guardar');

      //alert('se guado datos')
      //mnadar a guardar los datos
      addProduct({
        name,
        description,
        price,
      })
      .then((result)=>{
        //cuando la accion se ejecuta correctamente
        //y retorne una respuesta

        console.log(result);
        //hacer algo con el resultado
        if(!result.success){
            //hay errores
            alert(result.message);
            //mostrar los mensajes de errores
            setErrors({...result.errors});
        } else{
            //si guardo

            alert(result.message);

            setName(''),
            setDescription(''),
            setPrice('');
        }

      })
      .catch((error)=>{
        alert(error.message);
      });
      
}




return(
 <div class="mb-4" onSubmit={onSave}>
        
     <form method="POST">
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

            <button class="bg-white-500" type="submit"> Enviar</button> 
        </form>
</div>
)
}