import { Link } from "react-router-dom";
export default function LoginViews() {
  return (
    <>
      <h1 className="text-center bg-cyan-300">Iniciar Sesion</h1>
      <nav className="mt-10">
        <Link 
        className="text-center text-white text-lg cursor-pointer"
        to="/auth/register">Registrate</Link>
      </nav>
    </>
  );
}
