'use server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { error } from "console";

   /**
   *Funcion para registrar un nuevo producto
   *@param {*} product datos del producto
    */
export async function addProduct(product) {
    //validar los datos
    let errorsList = {};
//console.log(product)

    if(!product.name){
        errorsList.name='el nombre es obligatorio';
      //alert('name no tiene valor');
        //setErrors({...errors,
        //name:'el nombre es obligatorio'
        //});
    
    }

    if(!product.price){
        errorsList.price='El precio es obligatorio';
    }else {
            
            if(!product.price.match("^[0-9]+$")){
                errorsList.price = "El precio debe ser un numero";
            }
    }
       // alert('descripcion no tiene valor')
        //setErrors({...errors,
          //  descripcion:'descripcion es obligatorio'
            //});


    if(!product.description){
        errorsList.description ='La descripcion es obligatorio';
       // alert('descripcion no tiene valor')
        //setErrors({...errors,
          //  descripcion:'descripcion es obligatorio'
            //});
    
      }
  

  if(Object.keys(errorsList).length > 0){
     return{
        success: false,
        message: 'Ingresar los datos correctamnete',
        errors: errorsList,
    };
  }
    //si no hay errores en los datos
    //mnadar a insertar
    //manejar error al insertar
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)


    const{ data, error } = await supabase
    .from('products')
    .insert([
        product,
    ])
    .select()






    //si hay un erroe al insertar avisar al cliente
    if(error){
    return{
        success: false,
        message: `Ocurrio un error al guardar el producto 
        Error: ${error.message}`,
        errors: errorsList,
        errors:null,
    }
    }

    //si todo esta ok
    return{
        success: true,
        message:'El producto se a registrado correctamente',
        errors:null,
    };




}
