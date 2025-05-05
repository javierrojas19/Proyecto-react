import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import  axios, {isAxiosError} from "axios";
import type { RegisterForm } from "../types";
import {toast} from 'sonner'
import ErrorMessage from "../components/errorMessage";
import api from "../config/axios";


export default function RegisterView() {

  
  const InitialValues: RegisterForm = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: InitialValues });
  const handleRegister = async (formData: RegisterForm) => {
    try {
      console.log('Datos a enviar:', formData);
      const {data} = await api.post(`/auth/register`, formData)
     
     toast.success(data)
      reset()
    }catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('Error del servidor:', error.response?.data);
      } else {
        console.log(error);
      }
    }
  };
  const password = watch("password");
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Crear Cuenta</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name", { required: "tu nombre es obligatorio" })}
          />

          {errors.name && <ErrorMessage>{errors.name.message} </ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "tu email es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "email no valido", // Expresión regular para validar el formato del email
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message} </ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("handle", { required: "tu handle es obligatorio" })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message} </ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "tu password es obligatorio",
              minLength: {
                value: 8,
                message: "tu password debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message} </ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password_confirmation", {
              required: "tu password es obligatorio",
              validate: (value) =>
                value === password || "las contraseñas deben ser iguales",
            })}
          />
        </div>
        {errors.password_confirmation && (
          <ErrorMessage>{errors.password_confirmation.message} </ErrorMessage>
        )}

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Crear Cuenta"
        />
      </form>

      <nav className="mt-10">
        <Link
          className="text-center text-white text-lg cursor-pointer"
          to="/auth/login"
        >
          logeate
        </Link>
      </nav>
    </>
  );
}
