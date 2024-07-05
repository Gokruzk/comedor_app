"use client";
import { deleteFood, getMenus, getUserMenus } from "@/api/foodAPI";
import MenuCard from "@/components/MenuCard";
import NavBar from "@/components/NavBar";
import { MenuItem } from "@/types";
import { getUserSession } from "@/utils";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
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
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [detail, setDetail] = useState<any>(null);
  const [reload, setReload] = useState(false);
  const [user_type, setType] = useState(99);

  const fetchMenus = useCallback(async () => {
    try {
      const { status, data, error } = await getUserMenus();
      console.log(data)
      if (status === 200) {
        setIsLoading(false);
        setMenus(data); // Actualiza el estado con los datos del menú
      } else if (status === 404) {
        setIsLoading(false);
        setDetail("[]");
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

  useEffect(() => {
    const updateType = async () => {
      const { type } = await getUserSession();
      if (type !== null && type !== undefined) {
        setType(type);
      }
    };
    updateType();
  }, []);

  const availables_menus: MenuItem[] = [];

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
      setReload((prev) => !prev);
    },
    onError: (error) => {
      showToastMessage(`Error eliminando el menú: ${error.message}`, "error");
    },
  });

  const linkbuttons = [
    { href: "/admin_agregarmenu", title: "Agregar menú" },
    // { href: "/otro_menu", title: "Otro menú" },
    // Agrega más botones según sea necesario
  ];

  if (detail === "[]") {
    return (
      <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen">
        <NavBar
          title="<- Perfil"
          href="/perfil"
          nbuttons={2}
          // linkbuttons={linkbuttons}
        />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">No hay menús</div>
        </div>
        <ToastContainer />
      </main>
    );
  } else {
    menus.map((menu: MenuItem) => {
      if (menu.menu.status === true) {
        availables_menus.push(menu);
      }
    });
  }

  if (isLoading) {
    return (
      <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen">
        <NavBar
          title="<- Perfil"
          href="/perfil"
          nbuttons={2}
          linkbuttons={linkbuttons}
        />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
        <ToastContainer />
      </main>
    );
  } else if (isError) {
    return (
      <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen">
        <NavBar
          title="<- Perfil"
          href="/perfil"
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
  console.log(user_type)
  return (
    <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen">
      <NavBar
        title="<- Perfil"
        href="/perfil"
        nbuttons={2}
        linkbuttons={linkbuttons}
      />
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Menús disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availables_menus.map((menu: MenuItem) => (
                <MenuCard
                  key={menu.menu.id_menu}
                  menu={menu}
                  deleteFoodMutate={deleteFoodMutate}
                  type={user_type}
                />
              ))}
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
