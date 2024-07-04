"use client";
import Link from "next/link";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Menu, MenuItem, Params_Menu, UpdateMenuForm, User } from "@/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { getMenu, updateMenu } from "@/api/foodAPI";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function UpMenu({ params }: Params_Menu) {
  const { id_menu } = params;
  return (
    <QueryClientProvider client={queryClient}>
      <UpdateMenu id_menu={id_menu} />
    </QueryClientProvider>
  );
}

const UpdateMenu = ({ id_menu }: UpdateMenuForm) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [selectedTime, setSelectedTime] = useState(0);

  const updateThisMenu = async (formdata: any) => {
    const id_menu_type = formdata.id_menu_type;
    const id_meal_time = selectedTime;
    const menu_title = formdata.menu_title as string;
    const menu_description = formdata.menu_description as string;
    const price = formdata.price;
    const status_g = formdata.status;

    let status = true;
    if (status_g == "true") {
      status = true;
    } else {
      status = false;
    }

    const menu: Menu = {
      id_menu: Number(id_menu),
      id_menu_type: id_menu_type,
      id_meal_time: id_meal_time,
      menu_title: menu_title,
      menu_description: menu_description,
      price: price,
      status: status,
    };

    updateMenuMutation.mutate({
      ...menu,
    });
  };

  const {
    isLoading,
    data: menu,
    isError,
    error,
  } = useQuery({
    queryKey: ["menu", id_menu],
    queryFn: () => getMenu(id_menu),
  });

  let status_menu_description: any = "";
  let status_menu: any = "";

  if (menu?.data.menu.status == true) {
    status_menu = "true"
    status_menu_description = "Disponible";
  } else {
    status_menu = "false";
    status_menu_description = "No disponible";
  }

  useEffect(() => {
    if (menu) {
      setSelectedTime(menu.data.meal_time.id_meal_time);
    }
  }, [menu]);

  const showToastMessage = (mensaje: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(mensaje);
      setTimeout(() => {
        router.push("/comidas");
      }, 1100);
    } else {
      toast.error(mensaje);
    }
  };

  const updateMenuMutation = useMutation({
    mutationFn: updateMenu,
    onSuccess: (data) => {
      if (data.status === 200) {
        showToastMessage("Menú actualizado correctamente", "success");
      } else {
        showToastMessage(`${data.error}`, "error");
      }
    },
    onError: (error) => {
      console.log(error);
      showToastMessage(`${error}`, "error");
    },
  });

  if (isLoading)
    return (
      <main className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          Loading...
        </div>
      </main>
    );
  else if (isError)
    return (
      <main className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          Error {error.message}
        </div>
      </main>
    );

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              <Link
                href={"/comidas"}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                {"<-"} Regresar
              </Link>
            </p>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Actualizar menú de comida
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(updateThisMenu)}
            >
              <div>
                <label
                  htmlFor="menu_title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Título del menú
                </label>
                <input
                  id="menu_title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Título del menú"
                  required
                  defaultValue={menu?.data.menu.menu_title}
                  {...register("menu_title")}
                />
                <label
                  htmlFor="menu_description"
                  className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Descripción del menú
                </label>
                <input
                  id="menu_description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descripción del menú"
                  required
                  defaultValue={menu?.data.menu.menu_description}
                  {...register("menu_description")}
                />
                <label
                  htmlFor="price"
                  className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Precio
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Precio"
                  required
                  min={1}
                  defaultValue={menu?.data.menu.price}
                  {...register("price")}
                />
                <label
                  htmlFor="status"
                  className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Estado del menú
                </label>
                <select
                  id="status"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("status")}
                >
                  <option value={status_menu}>{status_menu_description}</option>
                  <option value="true">Disponible</option>
                  <option value="false">No disponible</option>
                </select>
                <label
                  htmlFor="id_menu_type"
                  className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tipo de menú
                </label>
                <select
                  id="id_menu_type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("id_menu_type")}
                >
                  <option value={menu?.data.menu_type.id_menu_type}>
                    {menu?.data.menu_type.menu_type}
                  </option>
                  <option value={1}>Normal</option>
                  <option value={2}>Vegetariano</option>
                  <option value={3}>Vegano</option>
                  <option value={4}>Alergias</option>
                </select>
                <div
                  inline-datepicker="true"
                  datepicker-autoselect-today="true"
                  className="mx-auto sm:mx-0 flex justify-center [&>div>div]:shadow-none [&>div>div]:bg-gray-50 [&_div>button]:bg-gray-50"
                ></div>
                <label className="mt-4 text-sm font-bold text-gray-900 dark:text-white mb-2 block">
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
                      checked={selectedTime === 1}
                      onChange={() => setSelectedTime(1)}
                    />
                    <label
                      htmlFor="6am-12-am"
                      className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900"
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
                      checked={selectedTime === 2}
                      onChange={() => setSelectedTime(2)}
                    />
                    <label
                      htmlFor="12am-13pm"
                      className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900"
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
                      checked={selectedTime === 3}
                      onChange={() => setSelectedTime(3)}
                    />
                    <label
                      htmlFor="18-21-pm"
                      className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900"
                    >
                      Merienda
                    </label>
                  </li>
                </ul>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};
