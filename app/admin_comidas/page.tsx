"use client";
import { useCallback, useEffect, useState } from "react";
import AdminMenuCard from "@/components/AdminMenuCard";
import { ToastContainer, toast } from "react-toastify";
import { deleteFood, getMenus } from "@/api/foodAPI";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "@/components/NavBar";
import { MenuItem } from "@/types";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import Loading from "@/components/Loading";

const queryClient = new QueryClient();

export default function FoodPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Comidas />
    </QueryClientProvider>
  );
}

function Comidas() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [detail_, setDetail] = useState<string>("[]");
  const [reload, setReload] = useState(false);

  const fetchMenus = useCallback(async () => {
    try {
      const { status, data, error, detail } = await getMenus();

      if (status === 200) {
        setDetail("");
        setIsLoading(false);
        setMenus(data); // Actualiza el estado con los datos del menú
      } else if (status === 404) {
        setIsLoading(false);
        setDetail(detail);
        setMenus([]);
      } else {
        setIsLoading(false);
        setIsError(true);
        setError(error);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  }, [setIsLoading, setMenus, setDetail, setIsError, setError]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus, reload]);

  const availables_menus: MenuItem[] = [];
  const unavailables_menus: MenuItem[] = [];

  const showToastMessage = (mensaje: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(mensaje);
    } else {
      toast.error(mensaje);
    }
  };

  const { mutate: deleteFoodMutate } = useMutation({
    mutationFn: deleteFood,
    onSuccess: (data) => {
      if (data.status === 200) {
        showToastMessage("Menú eliminado correctamente", "success");
        setMenus([]);
        setReload((prev) => !prev);
        setDetail("[]");
      } else {
        showToastMessage(`${data.error}`, "error");
      }
    },
    onError: (error) => {
      console.log(error);
      showToastMessage(`Error eliminando el menú: ${error}`, "error");
    },
  });

  const linkbuttons = [
    { href: "/admin_agregarmenu", title: "Agregar menú" },
    // { href: "/otro_menu", title: "Otro menú" },
    // Agrega más botones según sea necesario
  ];

  if (detail_ === "[]") {
    return (
      <main className="bg-gray-50 dark:bg-white flex min-h-screen">
        <NavBar
          title="<- Perfil"
          href="/admin_perfil"
          nbuttons={2}
          linkbuttons={linkbuttons}
        />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center text-gray-600">
            No hay menús disponibles
          </div>
        </div>
        <ToastContainer />
      </main>
    );
  } else {
    menus.map((menu: MenuItem) => {
      if (menu.menu.status === true) {
        availables_menus.push(menu);
      } else {
        unavailables_menus.push(menu);
      }
    });
  }

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  } else if (isError) {
    return (
      <main className="bg-gray-50 dark:bg-white flex min-h-screen">
        <NavBar
          title="<- Perfil"
          href="/admin_perfil"
          nbuttons={2}
          linkbuttons={linkbuttons}
        />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">Error {error.message}</div>
        </div>
        <ToastContainer />
      </main>
    );
  }

  return (
    <main className="bg-gray-50 dark:bg-white flex min-h-screen">
      <NavBar
        title="<- Volver"
        href="/admin_perfil"
        nbuttons={2}
        linkbuttons={linkbuttons}
      />
      <div className="flex-grow  flex-col items-center justify-center px-6 py-8 mx-auto lg:p-10">
        <div className="w-full max-w-6xl mx-20">
          <div className="mb-8">
            <h2 className="text-2xl font-normal text-gray-900 dark:text-gray-600 mb-4">
              Menús disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availables_menus.map((menu: MenuItem) => (
                <AdminMenuCard
                  key={menu.menu.id_menu}
                  menu={menu}
                  deleteFoodMutate={deleteFoodMutate}
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-normal text-gray-900 dark:text-gray-600 mb-4">
              Menús no disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unavailables_menus.map((menu: MenuItem) => (
                <AdminMenuCard
                  key={menu.menu.id_menu}
                  menu={menu}
                  deleteFoodMutate={deleteFoodMutate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
