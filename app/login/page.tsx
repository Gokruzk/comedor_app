"use client";
import { auth } from "@/api/userAPI";
import useStore from "@/store/auth/authStore";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const queryClient = new QueryClient();

export default function LoginF() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );
}

function LoginForm() {

  const loginUser = async (formdata: FormData) => {
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;
    const user = {
      email: email,
      password: password,
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
    mutationFn: auth,
    onSuccess: (data) => {
      if (data.status === 200) {
        showToastMessage("Inicio de sesión exitoso", "success");
      } else {
        showToastMessage(`Error de autenticación, ${data.error}`, "error");
      }
    },
    onError: (error) => {
      console.log(error);
      showToastMessage(`Ocurrió un error de autenticación, ${error}`, "error");
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
  const router = useRouter();


  return (
    <main className="bg-gray-50 dark:bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-3xl shadow-2xl dark:border md:mt-0 sm:max-w-4xl xl:p-0 dark:border-white grid grid-cols-2 justify-center items-center">
          
          {/* seccion de codigo para la imagen*/}
          <div className="flex justify-center items-center p-6 space-y-4 md:space-y-6 sm:p-8">
            <Image width={300} height={300} src="/ESPOCH.png" alt="" />
          </div>

          {/* seccion de codigo para el texto*/}
          <div className="p-6 space-y-4  md:space-y-6 sm:p-8">
            <p className="text-sm font-light text-gray-500 dark:text-gray-600">
              <Link href={"/"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                {"<-"} Volver a inicio
              </Link>
            </p>
            {/*<h1 className="text-xl font-bold leading-tight tracking-tight md:text-3xl text-black text-center">
              INICIO DE SESION
            </h1>*/}
            <form className="space-y-4 md:space-y-6" action={loginUser}>
              <div>{/*}                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-500"
                >
                  Email
                </label>*/}
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ingresa tu correo institucional"
                  required
                />
              </div>
              <div>
                {/*<label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-500 "
                >
                  Contraseña
                </label>*/}
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 py-2 b"
                    onClick={togglePasswordVisibility}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-600 dark:text-gray-600"
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
              </div>
              
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 w-2/3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Iniciar Sesión
              </button>
              </div>
              
              <p className="text-sm font-light text-gray-600 dark:text-gray-00 text-center">
                ¿No tienes una cuenta todavía?{" "}
                <Link
                  href={"/registro"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-red-500"
                >
                  Regístrate aquí
                </Link>
              </p>

              <p className="text-sm font-light text-gray-600 dark:text-gray-500 text-center">
                <Link
                  href={"/recuperar"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  ¿Has olvidado tu contraseña?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
