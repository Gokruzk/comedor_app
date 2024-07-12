"use client";

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Menu } from "@/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { addMenu } from "@/api/foodAPI";
import LinkButton from "@/components/LinkButton";

const queryClient = new QueryClient();

export default function AddMenu() {
  return (
    <QueryClientProvider client={queryClient}>
      <AgregarMenu />
    </QueryClientProvider>
  );
}

const AgregarMenu = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const addNewMenu = async (formdata: any) => {
    const id_menu_type = formdata.id_menu_type;
    const id_meal_time = formdata.timetable;
    const menu_title = formdata.menu_title as string;
    const menu_description = formdata.menu_description as string;
    const price = formdata.price;

    const menu: Menu = {
      id_menu_type: id_menu_type,
      id_meal_time: id_meal_time,
      menu_title: menu_title,
      menu_description: menu_description,
      price: price,
    };

    addMenuMutation.mutate({
      ...menu,
    });
  };

  const showToastMessage = (mensaje: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(mensaje);
      setTimeout(() => {
        router.push("/admin_comidas");
      }, 1100);
    } else {
      toast.error(mensaje);
    }
  };

  const addMenuMutation = useMutation({
    mutationFn: addMenu,
    onSuccess: (data) => {
      if (data.status === 200) {
        showToastMessage("Menú agregado correctamente", "success");
      } else {
        showToastMessage(`${data.error}`, "error");
      }
    },
    onError: (error) => {
      console.log(error);
      showToastMessage(`${error}`, "error");
    },
  });

  return (
    <main className="bg-gray-50 dark:bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-white">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-600">
              Agregar menu de comida
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(addNewMenu)}
            >
              <div>
                <input
                  id="menu_title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                  placeholder="Título del menú"
                  required
                  {...register("menu_title")}
                />

                <textarea
                  id="menu_description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                  placeholder="Descripción del menú"
                  required
                  {...register("menu_description")}
                />

                <input
                  type="number"
                  step="0.01"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                  placeholder="Precio $$$"
                  required
                  min={1}
                  max={999.99}
                  {...register("price")}
                />

                <select
                  id="id_menu_type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                  {...register("id_menu_type")}
                >
                  <option defaultValue={"Tipo de usuario"}>Tipo de menú</option>
                  <option value={1}>Normal</option>
                  <option value={2}>Vegetariano</option>
                  <option value={3}>Vegano</option>
                  <option value={4}>Alergias</option>
                </select>
                <div
                  inline-datepicker="true"
                  datepicker-autoselect-today="true"
                  className="mx-auto sm:mx-0 flex justify-center [&>div>div]:shadow-none [&>div>div]:bg-gray-500 [&_div>button]:bg-gray-800"
                ></div>
                <label className="mt-4 text-sm font-bold text-gray-900 dark:text-gray-600 mb-4 block">
                  Seleccionar el horario en el que menú estará disponible
                </label>
                <ul
                  id="timetable"
                  className="grid w-full grid-cols-3 gap-2 mb-5"
                >
                  <li>
                    <input
                      type="radio"
                      id="6am-12-am"
                      value={1}
                      className="hidden peer"
                      {...register("timetable")}
                    />
                    <label
                      htmlFor="6am-12-am"
                      className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-white dark:hover:gray-500 bg-white dark:bg-whiteborder shadow-xl rounded-xl cursor-pointer text-gray-800 border-gray-200 dark:border-gray-700 dark:hover:border-gray-600 dark:peer-checked:text-white  hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-400 dark:peer-checked:bg-gray-600"
                    >
                      Desayuno
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="12am-13pm"
                      value={2}
                      className="hidden peer"
                      {...register("timetable")}
                    />
                    <label
                      htmlFor="12am-13pm"
                      className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-white dark:hover:gray-500 bg-white dark:bg-whiteborder shadow-xl rounded-xl cursor-pointer text-gray-800 border-gray-200 dark:border-gray-700 dark:hover:border-gray-600 dark:peer-checked:text-white  hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-400 dark:peer-checked:bg-gray-600"
                    >
                      Almuerzo
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="18-21-pm"
                      value={3}
                      className="hidden peer"
                      {...register("timetable")}
                    />
                    <label
                      htmlFor="18-21-pm"
                      className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-white dark:hover:gray-500 bg-white dark:bg-whiteborder shadow-xl rounded-xl cursor-pointer text-gray-800 border-gray-200 dark:border-gray-700 dark:hover:border-gray-600 dark:peer-checked:text-white  hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-400 dark:peer-checked:bg-gray-600"
                    >
                      Merienda
                    </label>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-800 w-2/3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Agregar menú
                </button>
              </div>

              <div className="flex justify-center items-center">
                <LinkButton
                  href={"/admin_comidas"}
                  style="bg-blue-500 hover:bg-blue-700 w-2xl text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  title="Cancelar y volver"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};
