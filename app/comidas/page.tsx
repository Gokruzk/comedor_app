"use client";
import { deleteFood, getMenus } from "@/api/foodAPI";
import DeleteButton from "@/components/DeleteButton";
import LinkButton from "@/components/LinkButton";
import userStore from "@/store/auth/userStore";
import { MenuItem } from "@/types";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function FoodPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Comidas />
    </QueryClientProvider>
  );
}

function Comidas() {
  const authUser = userStore((state) => state.authUser);

  const {
    isLoading,
    data: menus,
    isError,
    error,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenus,
    retry: 1000,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchInterval: 1000,
  });

  const showToastMessage = (mensaje: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(mensaje);
    } else {
      toast.error(mensaje);
    }
  };

  const { mutate: deleteFoodMutate } = useMutation({
    mutationFn: deleteFood,
    onSuccess: () => {
      showToastMessage("Menú eliminado correctamente", "success");
    },
    onError: (error) => {
      showToastMessage(`Error eliminando el menú: ${error.message}`, "error");
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menus?.data.map((menu: MenuItem) => (
            <div
              key={menu.menu.id_menu}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {menu.menu.menu_title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Descripción: {menu.menu.menu_description}
              </p>
              <div className="flex space-x-2">
                <LinkButton
                  href={`/comidas/${menu.menu.id_menu}`}
                  style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  title="Reservar ->"
                />
                <LinkButton
                  href={`/comidas/${menu.menu.id_menu}`}
                  style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  title="Actualizar ->"
                />
                <DeleteButton
                  title="Eliminar ->"
                  style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={() => {
                    if (menu.menu.id_menu) {
                      deleteFoodMutate(menu.menu.id_menu.toString());
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      <div className="px-9 py-5 ml-3">
        <LinkButton
          href="/perfil"
          style="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          title="Regresar"
        />
        <LinkButton
          href="/agregar_menu"
          style="py-2.5 px-5 ml-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          title="Agregar menú"
        />
      </div>
      </div>
      <ToastContainer />
    </main>
  );
}
