import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/errorMessage";
import { loginForm } from "../types";
import api from "../config/axios";
import { toast } from "sonner";
import axios from "axios";

export default function LoginViews() {
  const InitialValues: loginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: InitialValues });

  const handleLogin = async (formData: loginForm) => {
    try {
      
      const { data } = await api.post(`/auth/login`, formData);
      localStorage.setItem("AUTH_TOKEN",data)
      toast.success(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Error del servidor:", error.response?.data);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <>
      <h1 className="text-center bg-cyan-300">Iniciar Sesion</h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
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
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Iniciar Sesión"
        />
      </form>

      <nav className="mt-10">
        <Link
          className="text-center text-white text-lg cursor-pointer"
          to="/auth/register"
        >
          Registrate
        </Link>
      </nav>
    </>
  );
}
