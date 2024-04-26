"use client"

import { useState } from "react";
import { changePassword } from "./actions";
import { useRouter } from "next/navigation";
import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ChangePassword() {
  const router = useRouter()
  const [passwd, setPasswd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [errors, setErrors] = useState({});
  const supabase = createClient()

  function onSave(event) {
    event.preventDefault();

    let errorsList = {};

    if (!passwd) {
      errorsList.passwd = "La contraseña es obligatoria";
    } else if (passwd.length < 6) {
      errorsList.passwd = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!confirmPwd) {
      errorsList.confirmPwd = "Confirmar contraseña es obligatorio";
    } else if (passwd && passwd !== confirmPwd) {
      errorsList.confirmPwd = "Las contraseñas no coinciden";
    }

    setErrors({ ...errorsList });

    if (Object.keys(errorsList).length > 0) {
      return;
    }

    changePassword(passwd, confirmPwd)
      .then((result) => {
        console.log(result);
        alert(result.message);
        if (!result.success) {
          setErrors({ ...result.errors });
        } else {
          setPasswd('');
          setConfirmPwd('');
          setErrors({});
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  /*useEffect(() => {
    const getData = async () => {
      const { data: {session} } = await supabase.auth.getSession()
      if(!session){
        router.push('/login')
        return
      }}
    getData()
  }, [])*/

  return (
    <div className="mt-16">
  <form onSubmit={onSave} className="bg-blue-100 p-20 rounded-md shadow-md">
    <div className="mb-10 flex flex-col">
    <h1 className='text-center text-4xl font-bold text-blue-600 mb-20 font-mono'>Cambio de    contraseña</h1>
      <label htmlFor="name" className="text-blue-800">Contraseña</label>
      <input 
        type="password"
        name="passwd"
        className="border rounded p-2 text-black"
        value={passwd}
        onChange={(e) => {
          setPasswd(e.target.value);
          setErrors({
            ...errors,
            passwd: undefined,
          });
        }}
      />
      <p className="text-red-500">{errors.passwd || ''}</p>
    </div>
    <div className="mb-3 flex flex-col">
      <label htmlFor="confirmPwd" className="text-blue-800">Confirmar contraseña</label>
      <input 
        type="password" 
        name="confirmPwd"
        className="border rounded p-2 text-black"
        value={confirmPwd}
        onChange={(e) => {
          setConfirmPwd(e.target.value);
          setErrors({
            ...errors,
            confirmPwd: undefined,
          });
        }}
      />
      <p className="text-red-500">{errors.confirmPwd || ''}</p>
    </div>

    <div className="my-6 flex flex-col">
        <button 
          type="submit" 
          className="bg-blue-700 text-white p-2 rounded-md border border-blue-800 hover:bg-blue-600"
        >
          Cambiar Contraseña
        </button>
      </div>
    </form>
  </div>
  );
}


// formulario para cambiar contraseña (solo tiene acceso si esta autenticado)

//formulario para cambiar contraseña
//solo tiene acceso si esta autenticado

//componente cliente
//estado para:contraseña, confirmar contraseña 
//validar logitud minima de 6 caracteres
//contraseña y confirmar contraseña sean iguales
//mandar a ctuañlizar contraseña


