// "use client";
// import { deleteFood, getMenus } from "@/api/foodAPI";
// import DeleteButton from "@/components/DeleteButton";
// import LinkButton from "@/components/LinkButton";
// import userStore from "@/store/auth/userStore";
// import { MenuItem } from "@/types";
// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
//   useMutation,
// } from "@tanstack/react-query";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const queryClient = new QueryClient();

// export default function FoodPage() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Comidas />
//     </QueryClientProvider>
//   );
// }

// function Comidas() {
//   const authUser = userStore((state) => state.authUser);

//   const {
//     isLoading,
//     data: menus,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["menu"],
//     queryFn: getMenus,
//     retry: 1000,
//     retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
//     refetchInterval: 1000,
//   });

//   const availables_menus: any = [];
//   const unavailables_menus: any = [];

//   menus?.data.map((menu: MenuItem) => {
//     if (menu.menu.status === true) {
//       availables_menus.push(menu);
//     }
//   });

//   menus?.data.map((menu: MenuItem) => {
//     if (menu.menu.status === false) {
//       unavailables_menus.push(menu);
//     }
//   });

//   console.log(availables_menus);
//   console.log(unavailables_menus);

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
//     },
//     onError: (error) => {
//       showToastMessage(`Error eliminando el menú: ${error.message}`, "error");
//     },
//   });

//   if (isLoading)
//     return (
//       <main className="bg-gray-50 dark:bg-gray-900">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//           Loading...
//         </div>
//       </main>
//     );
//   else if (isError)
//     return (
//       <main className="bg-gray-50 dark:bg-gray-900">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//           Error {error.message}
//         </div>
//       </main>
//     );

//   return (
//     <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen">
//       <nav className="w-64 bg-white dark:bg-gray-800 shadow-md h-screen p-4">
//         <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//           <LinkButton
//             title="<- Regresar"
//             href="/perfil"
//             style="font-medium text-primary-600 hover:underline dark:text-primary-500"
//           />
//         </p>
//         <ul className="mt-8">
//           <li className="mb-4">
//             <LinkButton
//               href="/agregar_menu"
//               style="py-2.5 px-5 ml-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//               title="Agregar menú"
//             />
//             {/* <LinkButton
//               href={`/comidas`}
//               style="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               title="Comidas"
//             /> */}
//           </li>
//         </ul>
//       </nav>
//       <div className="flex-grow flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           Menús disponibles
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {availables_menus.map((menu: MenuItem) => (
//             <div
//               key={menu.menu.id_menu}
//               className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3"
//             >
//               <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                 {menu.menu.menu_title}
//               </h5>
//               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                 Descripción: {menu.menu.menu_description}
//               </p>
//               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                 Tipo de menú: {menu.meal_time.meal_time} -{" "}
//                 {menu.menu_type.menu_type}
//               </p>
//               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                 Precio: {menu.menu.price}
//               </p>
//               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                 Horario: {menu.meal_time.init_hour} - {menu.meal_time.end_hour}
//               </p>
//               <div className="flex space-x-2">
//                 <LinkButton
//                   href={`/comprar_menu/${menu.menu.id_menu}`}
//                   style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   title="Comprar ->"
//                 />
//                 <LinkButton
//                   href={`/comidas/${menu.menu.id_menu}`}
//                   style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   title="Actualizar ->"
//                 />
//                 <DeleteButton
//                   title="Eliminar ->"
//                   style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
//                   onClick={() => {
//                     if (menu.menu.id_menu) {
//                       deleteFoodMutate(menu.menu.id_menu.toString());
//                     }
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             Menús no disponibles
//           </div>
//           {unavailables_menus.map((menu: MenuItem) => (
//             <div
//               key={menu.menu.id_menu}
//               className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3"
//             >
//               <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                 {menu.menu.menu_title}
//               </h5>
//               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                 Descripción: {menu.menu.menu_description}
//               </p>
//               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                 Tipo de menú: {menu.meal_time.meal_time} -{" "}
//                 {menu.menu_type.menu_type}
//               </p>
//               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                 Precio: {menu.menu.price}
//               </p>
//               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                 Horario: {menu.meal_time.init_hour} - {menu.meal_time.end_hour}
//               </p>
//               <div className="flex space-x-2">
//                 <LinkButton
//                   href={`/comprar_menu/${menu.menu.id_menu}`}
//                   style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   title="Comprar ->"
//                 />
//                 <LinkButton
//                   href={`/comidas/${menu.menu.id_menu}`}
//                   style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   title="Actualizar ->"
//                 />
//                 <DeleteButton
//                   title="Eliminar ->"
//                   style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
//                   onClick={() => {
//                     if (menu.menu.id_menu) {
//                       deleteFoodMutate(menu.menu.id_menu.toString());
//                     }
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <ToastContainer />
//     </main>
//   );
// }
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

  const availables_menus: MenuItem[] = [];
  const unavailables_menus: MenuItem[] = [];

  menus?.data.forEach((menu: MenuItem) => {
    if (menu.menu.status === true) {
      availables_menus.push(menu);
    } else {
      unavailables_menus.push(menu);
    }
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
    <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen">
      <nav className="w-64 bg-white dark:bg-gray-800 shadow-md h-screen p-4">
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          <LinkButton
            title="<- Regresar"
            href="/perfil"
            style="font-medium text-primary-600 hover:underline dark:text-primary-500"
          />
        </p>
        <ul className="mt-8">
          <li className="mb-4">
            <LinkButton
              href="/agregar_menu"
              style="py-2.5 px-5 ml-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              title="Agregar menú"
            />
          </li>
        </ul>
      </nav>
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Menús disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availables_menus.map((menu: MenuItem) => (
                <div
                  key={menu.menu.id_menu}
                  className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {menu.menu.menu_title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Descripción: {menu.menu.menu_description}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Tipo de menú: {menu.meal_time.meal_time} -{" "}
                    {menu.menu_type.menu_type}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Precio: {menu.menu.price}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Horario: {menu.meal_time.init_hour} -{" "}
                    {menu.meal_time.end_hour}
                  </p>
                  <div className="flex space-x-2">
                    <LinkButton
                      href={`/comprar_menu/${menu.menu.id_menu}`}
                      style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      title="Comprar ->"
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
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Menús no disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unavailables_menus.map((menu: MenuItem) => (
                <div
                  key={menu.menu.id_menu}
                  className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {menu.menu.menu_title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Descripción: {menu.menu.menu_description}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Tipo de menú: {menu.meal_time.meal_time} -{" "}
                    {menu.menu_type.menu_type}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Precio: {menu.menu.price}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Horario: {menu.meal_time.init_hour} -{" "}
                    {menu.meal_time.end_hour}
                  </p>
                  <div className="flex space-x-2">
                    <LinkButton
                      href={`/comprar_menu/${menu.menu.id_menu}`}
                      style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      title="Comprar ->"
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
