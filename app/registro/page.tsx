"use client";

import Link from "next/link";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { addUser } from "@/api/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function RegisterF() {
  return (
    <QueryClientProvider client={queryClient}>
      <RegisterForm />
    </QueryClientProvider>
  );
}

const RegisterForm = () => {
  const router = useRouter();
  const registerUser = async (formdata: FormData) => {
    const correo = formdata.get("correo") as string;
    const cedula = formdata.get("cedula") as string;
    const nombre = formdata.get("nombre") as string;
    const apellido = formdata.get("apellido") as string;
    const contrasena = formdata.get("password") as string;
    const celular = formdata.get("celular") as string;
    const tipo_usuario = formdata.get("type_user") as string;

    const user: User = {
      id_user_type: Number(tipo_usuario),
      user_name: nombre,
      user_last_name: apellido,
      cedula: cedula,
      email: correo,
      hash_password: contrasena,
      cellphone: celular,
      balance: 0,
      created_date: "",
    };

    addUserMutation.mutate({
      ...user,
    });
  };
  const showToastMessage = (mensaje: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(mensaje);
      setTimeout(() => {
        router.push("/perfil");
      }, 1500);
    } else {
      toast.error(mensaje);
    }
  };

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      if (data.status === 200) {
        showToastMessage("Usuario registrado correctamente", "success");
      } else {
        showToastMessage(`${data.error}`, "error");
      }
    },
    onError: (error) => {
      console.log(error);
      showToastMessage(`${error}`, "error");
    },
  });

  function togglePasswordVisibility() {
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement | null;

    if (passwordInput) {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    }
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-3xl shadow-2xl dark:border md:mt-0 sm:max-w-4xl  xl:p-0 dark:border-white justify-center items-center">

          <div className="p-6 space-y-4 md:space-y-6 sm:px-8 sm:pb-0">
            <p className="text-sm font-light text-gray-500 dark:text-gray-600">
                <Link
                  href={"/"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {"<-"} Volver a Inicio
                </Link>
            </p>
          </div>

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 sm:pt-2">
            
            {/**columna izquerda */}

            {/*
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Registro
            </h1>*/}
            <form className="space-y-4 md:space-y-6" action={registerUser}>

              <div className="grid grid-cols-2 gap-8 place-content-center">
                
                <div>
                  <input
                    type="email"
                    name="correo"
                    id="correo"
                    className="bg-gray-50 border my-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Correo Electrónico"
                    required
                  />
                  
                  <input
                    name="cedula"
                    id="cedula"
                    className="bg-gray-50 border my-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Cédula"
                    required
                  />
                
                  <input
                    name="nombre"
                    id="nombre"
                    className="bg-gray-50 border my-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombre"
                    required
                  />

                  <input
                    name="apellido"
                    id="apellido"
                    className="bg-gray-50 border my-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Apellido"
                    required
                  />
    
                  <input
                    name="celular"
                    id="celular"
                    className=" bg-gray-50 border my-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Número Telefónico"
                    required
                    maxLength={10}
                  />
                </div>


                  {/**columna derecha*/}
                <div>
                    
                  <select
                    id="type_user"
                    name="type_user"
                    className="bg-gray-50 border my-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue={"Tipo de usuario"}>
                      Elegir tipo de usuario
                    </option>
                    <option value={0}>Administrativo</option>
                    <option value={1}>Estudiante</option>
                    <option value={2}>Profesor</option>
                    <option value={3}>Personal</option>
                  </select>

                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="bg-gray-50 border my-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-3 py-2"
                      onClick={togglePasswordVisibility}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-600 dark:text-gray-6 00"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          className="hs-password-active:hidden"
                          d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                        ></path>
                        <path
                          className="hs-password-active:hidden"
                          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                        ></path>
                        <path
                          className="hs-password-active:hidden"
                          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                        ></path>
                        <line
                          className="hs-password-active:hidden"
                          x1="2"
                          x2="22"
                          y1="2"
                          y2="22"
                        ></line>
                        <path
                          className="hidden hs-password-active:block"
                          d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        ></path>
                        <circle
                          className="hidden hs-password-active:block"
                          cx="12"
                          cy="12"
                          r="3"
                        ></circle>
                      </svg>
                    </button>
                  </div>

                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      className="bg-green-600 my-4 hover:bg-green-700 w-2/3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Registrarse
                    </button>
                  </div>

                  <p className="text-sm font-light mt-4 text-gray-600 dark:text-gray-00 text-center">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      href={"/login"}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-red-500"
                    >
                      Inicia sesión aquí
                    </Link>
                  </p>

                  
                </div>

              </div>


              
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};
