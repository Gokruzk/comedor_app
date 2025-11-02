"use client";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import LinkButton from "@/components/LinkButton";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { UserLogin } from "@/types";
import { recoverPassword } from "@/api/userAPI";

const queryClient = new QueryClient();

export default function RecoveryForm() {
  return (
    <QueryClientProvider client={queryClient}>
      <Recovery />
    </QueryClientProvider>
  );
}

function Recovery() {
  const { register, handleSubmit } = useForm();
  const recoverPwd = async (formdata: any) => {
    const email = formdata.email;
    const pwd = formdata.password;

    const user: UserLogin = {
      email: email,
      password: pwd,
    };

    recPwd.mutate({
      ...user,
    });
  };

  const showToastMessage = (mensaje: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(mensaje);
    } else {
      toast.error(mensaje);
    }
  };

  const recPwd = useMutation({
    mutationFn: recoverPassword,
    onSuccess: (data) => {
      // console.log(data);
      if (data.status === 200) {
        showToastMessage(`${data.detail}`, "success");
      } else {
        showToastMessage(`${data.detail}`, "error");
      }
    },
    onError: (error) => {
      showToastMessage(`${error}`, "error");
    },
  });

  return (
    <main className="bg-gray-50 dark:bg-gray-100  h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-5">
        <div className="w-full bg-white rounded-3xl shadow-2xl dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:border-white  justify-center items-center">
          <div className="p-6 space-y-4 md:space-y-2 sm:p-8 sm:pb-4">
            <p className="text-sm font-light text-gray-500 dark:text-gray-600">
              <LinkButton
                title="<- Volver"
                href="/login"
                style="font-medium text-primary-600 hover:underline dark:text-primary-500"
              />
            </p>
          </div>

          <div className="px-6 space-y-4 sm:p-8 sm:py-4 text-black">
            <p className="text-3xl font-bold">¿Olvidaste tu contraseña?</p>
            <p>Ingresa tu correo para poder recuperar tu contraseña</p>
          </div>

          <form
            className="flex items-center px-6 space-x-4 sm:p-8 mx-auto w-full"
            onSubmit={handleSubmit(recoverPwd)}
          >
            <div className="relative w-2/3">
              <input
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ingresa tu correo electrónico"
                required
                {...register("email")}
              />
              <input
                type="text"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full mt-4 p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ingresa nueva contraseña"
                required
                {...register("password")}
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 w-1/3 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Recuperar Cuenta
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
