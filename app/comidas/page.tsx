"use client";
import { deleteFood, getMenus } from "@/api/foodAPI";
import DeleteButton from "@/components/DeleteButton";
import LinkButton from "@/components/LinkButton";
import MenuCard from "@/components/MenuCard";
import NavBar from "@/components/NavBar";
import userStore from "@/store/auth/userStore";
import { LinkButtonProps, MenuItem } from "@/types";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
  // const authUser = userStore((state) => state.authUser);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    // const interval = setInterval(() => {
    async () => {
      //     try {
      //       setIsLoading(true);
      const data = await getMenus();
      console.log(data);
      //       setMenus(data.data);
      //       setDetail(data.detail);
      //       setIsLoading(false);
      //     } catch (error) {
      //       setIsError(true);
      //       setError(error);
      //       setIsLoading(false);
      //     }
    };
    // }, 1000);

    // return () => clearInterval(interval);
  }, []);

  console.log(menus);

  // const {
  //   isLoading,
  //   data: menus,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["menu"],
  //   queryFn: getMenus,
  //   retry: 1000,
  //   retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  //   refetchInterval: 1000,
  // });

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
    onSuccess: () => {
      showToastMessage("Menú eliminado correctamente", "success");
    },
    onError: (error) => {
      showToastMessage(`Error eliminando el menú: ${error.message}`, "error");
    },
  });

  const linkbuttons = [
    { href: "/agregar_menu", title: "Agregar menú" },
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
          linkbuttons={linkbuttons}
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
      } else {
        unavailables_menus.push(menu);
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
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Menús no disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unavailables_menus.map((menu: MenuItem) => (
                <MenuCard
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
// import { useEffect, useState } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import MenuCard from "@/components/MenuCard";

// function Comidas() {
//   const authUser = userStore((state) => state.authUser);
//   const [menus, setMenus] = useState<MenuItem[] | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMenus = async () => {
//       try {
//         const { data, status, detail } = await getMenus();
//         if (status === 200) {
//           setMenus(data);
//         } else {
//           setError(detail ?? "Error consultando menús");
//           setIsError(true);
//         }
//       } catch (error: unknown) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError("Error consultando menús");
//         }
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const intervalId = setInterval(fetchMenus, 1000);
//     fetchMenus(); // Fetch initially
//     return () => clearInterval(intervalId);
//   }, []);

//   const showToastMessage = (mensaje: string, type: "success" | "error") => {
//     if (type === "success") {
//       toast.success(mensaje);
//     } else {
//       toast.error(mensaje);
//     }
//   };

//   const { mutate: deleteFoodMutate } = useMutation({
//     mutationFn: deleteFood,
//     onSuccess: () => {
//       showToastMessage("Menú eliminado correctamente", "success");
//       // Optionally, you could refetch menus after deleting
//       // setMenus((prevMenus) => prevMenus?.filter(menu => menu.menu.id_menu !== deletedMenuId));
//     },
//     onError: (error) => {
//       showToastMessage(`Error eliminando el menú: ${error.message}`, "error");
//     },
//   });

//   const linkbuttons = [
//     { href: "/agregar_menu", title: "Agregar menú" },
//     // Add more link buttons as needed
//   ];

//   if (isLoading) {
//     return <LoadingScreen linkbuttons={linkbuttons} />;
//   }

//   if (isError || !menus) {
//     return <ErrorScreen error={error ?? "Error consultando menús"} />;
//   }

//   return (
//     <div>
//       <AvailableMenus
//         menus={menus}
//         deleteFoodMutate={deleteFoodMutate}
//         linkbuttons={linkbuttons}
//       />
//       <UnavailableMenus menus={menus} deleteFoodMutate={deleteFoodMutate} />
//       <ToastContainer />
//     </div>
//   );
// }

// const LoadingScreen = ({ linkbuttons }: { linkbuttons: LinkButtonProps[] }) => (
//   <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen">
//     <NavBar
//       title="<- Perfil"
//       href="/perfil"
//       nbuttons={2}
//       linkbuttons={linkbuttons}
//     />
//     <div className="flex-grow flex items-center justify-center">
//       <div className="text-center">Loading...</div>
//     </div>
//     <ToastContainer />
//   </main>
// );

// const ErrorScreen = (
//   { error }: { error: string },
//   { linkbuttons }: { linkbuttons: LinkButtonProps[] }
// ) => (
//   <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen">
//     <NavBar
//       title="<- Perfil"
//       href="/perfil"
//       nbuttons={2}
//       linkbuttons={linkbuttons}
//     />
//     <div className="flex-grow flex items-center justify-center">
//       <div className="text-center">Error: {error}</div>
//     </div>
//     <ToastContainer />
//   </main>
// );

// const AvailableMenus = ({
//   menus,
//   deleteFoodMutate,
//   linkbuttons,
// }: {
//   menus: MenuItem[];
//   deleteFoodMutate: Function;
//   linkbuttons: { href: string; title: string }[];
// }) => {
//   const availables_menus: MenuItem[] = menus.filter(
//     (menu) => menu.menu.status === true
//   );

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
//           Menús disponibles
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {availables_menus.map((menu) => (
//             <MenuCard
//               key={menu.menu.id_menu}
//               menu={menu}
//               deleteFoodMutate={deleteFoodMutate}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const UnavailableMenus = ({
//   menus,
//   deleteFoodMutate,
// }: {
//   menus: MenuItem[];
//   deleteFoodMutate: Function;
// }) => {
//   const unavailables_menus: MenuItem[] = menus.filter(
//     (menu) => menu.menu.status !== true
//   );

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
//           Menús no disponibles
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {unavailables_menus.map((menu) => (
//             <MenuCard
//               key={menu.menu.id_menu}
//               menu={menu}
//               deleteFoodMutate={deleteFoodMutate}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
