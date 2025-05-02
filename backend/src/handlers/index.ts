// Importamos el modelo de usuario y utilidades necesarias
import User from "../models/User";
import { validationResult } from 'express-validator';
import slug from "slug";
import { checkPassword, hashPassword } from "../utils/auth";

// Función para crear una cuenta de usuario
export const createAcount = async (req, res) => {
  
  

  const { email, password } = req.body;
  // Verificamos si el correo electrónico ya está registrado en la base de datos
  const UserExists = await User.findOne({ email });
  if (UserExists) {
    // Si el correo ya existe, devolvemos un error 409 (conflicto)
    const error = new Error("el usuario ya esta registrado");
    return res.status(409).json({ error: error.message });
  }

  // Generamos un "handle" único basado en el nombre de usuario proporcionado
  const handle = slug(req.body.handle, "");
  const handleExist = await User.findOne({ handle });
  
  if (handleExist) {
    // Si el "handle" ya está en uso, devolvemos un error 409
    const error = new Error("nombre de usuario no disponible ");
    return res.status(409).json({ error: error.message });
  }

  // Creamos un nuevo usuario con los datos proporcionados
  const user = new User(req.body);

  // Encriptamos la contraseña antes de guardarla en la base de datos
  user.password = await hashPassword(password);

  // Asignamos el "handle" generado al usuario
  user.handle = handle;

  // Guardamos el usuario en la base de datos
  await user.save(req.body);

  // Enviamos una respuesta indicando que el registro fue exitoso
  res.send("registrado");
};


export const login = async (req,res) =>{
  let errors = validationResult(req);
  if (errors.isEmpty()) {
    // Si hay errores, devolvemos un estado 400 con los detalles
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    // Si el usuario ya existe, devolvemos un error 409 (conflicto)
    const error = new Error("el usuario no existe");
    return res.status(404).json({ error: error.message });
    
  } 
  console.log("Si existe")

  //comprobar el password

 
const isPasswordCorrect= await checkPassword(password,user.password)
  if(!isPasswordCorrect){
    const error = new Error("Password incorrecto")
    return res.status(401).json({error : error.message})
  }
}