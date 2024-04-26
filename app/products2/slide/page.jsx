
"use client"

import Slider from "../../../components/slider";

export default function SwiperPage(){

        //funcion que retorna una tarjeta para el producto
        //para cada caja,
    const productCard =(product)=> (
        //calcular distancia con el lado izquierdo
//const left =index > 0 ? (index * 170) :0 ;

        <div
        key = {product.id}
        className="p-4 bg-sky-200 text-black border border-1 "
        >
            <p>
                {product.name}
            </p>
        </div>
);

    const products =[
        {id:'1', name:'Producto 1'},
        {id:'2', name:'Producto 2'},
        {id:'3', name:'Product 3'},
        {id:'4', name:'Product 4'},
        {id:'5', name:'Product 5'},
        {id:'6', name:'Product 6'},
        {id:'7', name:'Product 6'},
        {id:'8', name:'Product 6'},
        {id:'9', name:'Product 6'}

    ]


return(
    <div className="py-14 px-4  w-full">
        <h1>Este es un ejemplo de slider</h1>


    <Slider
        height={120}
        itemWidth={150}
        items={products.map((product) => productCard(product))}
        />



    <Slider
        height={120}
        itemWidth={150}
        items={products.map((product) => productCard(product))}
        className="mt-8"
        />

      <Slider
        height={120}
        itemWidth={150}
        items={products.map((product) => productCard(product))}
        className="mt-10"
        />       

              
        
    </div>
);

}

/*"use Client"

import Slider from "../../components/Slider";

export default function SwiperPage(){

  //funcion que retorna una tarjeta para el producto
  const productCard  = (product) => (
    <div
       key={product.id}
       clasName="p-4 h=[120px] bg-slate-200 border border-1"
    >
        <p>{product.name}</p>
       </div>
  );

  const products = [
    {id: '1', name: 'Product1'},
    {id: '2', name: 'Product2'},
    {id: '3', name: 'Product3'},
    {id: '4', name: 'Product4'}
  ]



  return(
    <div className="py-14 px-4 block w-full">
       <h1>Este es unejemplo de Slider<h1>

      <Slider
        height={120}
        itemWidth={150}
        items={products.map((product) => productCard(product))}
        
        />


      <Slider
        height={120}
        itemWidth={150}
        items={products.map((product) => productCard(product))}
        clasName="mt-10"
         />

       <Slider
        height={120}
        itemWidth={150}
        items={products.map((product) => productCard(product))}
        clasName="mt-8"
        />
    </div>
    
);

}
*/