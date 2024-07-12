"use client";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CreateDiningReservation, MenuForm, Params_Menu } from "@/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { diningReservation, getMenu } from "@/api/foodAPI";
import { useEffect, useState } from "react";
import { getUserSession } from "@/utils";
import BuyCard from "@/components/BuyCard";
import LinkButton from "@/components/LinkButton";
import Loading from "@/components/Loading";

const queryClient = new QueryClient();

export default function CompraQ({ params }: Params_Menu) {
  const { id_menu } = params;
  return (
    <QueryClientProvider client={queryClient}>
      <CompraMenu id_menu={id_menu} />
    </QueryClientProvider>
  );
}

const CompraMenu = ({ id_menu }: MenuForm) => {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState(0);
  const [loadingPurchase, setIsLoading] = useState<boolean>(false);

  const buyMenu = async (formdata: any) => {
    setIsLoading(true);
    const { user } = await getUserSession();
    const email = user;

    let user_email = "";
    if (email) user_email = email;

    // Obtener la fecha y hora actual
    const now = new Date();

    // Formatear la fecha como 'YYYY-MM-DD'
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Los meses son base 0
    const day = String(now.getDate()).padStart(2, "0");

    // Formatear la hora como 'HH:MM:SS'
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const reservation: CreateDiningReservation = {
      id_menu: Number(id_menu),
      email: user_email,
      reservation_date: `${year}-${month}-${day}`,
      reservation_hour: `${hours}:${minutes}`,
    };

    reservationMutation.mutate({
      ...reservation,
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
      }, 1000);
    } else {
      toast.error(mensaje);
    }
  };

  const reservationMutation = useMutation({
    mutationFn: diningReservation,
    onSuccess: (data) => {
      if (data.status === 200) {
        showToastMessage(
          "Compra realizada correctamente, verifique su email",
          "success"
        );
      } else {
        showToastMessage(`${data.error}`, "error");
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error);
      showToastMessage(`${error}`, "error");
      setIsLoading(false);
    },
  });

  if (isLoading || loadingPurchase) {
    return (
      <main>
        <Loading />
        <ToastContainer />
      </main>
    );
  } else if (isError)
    return (
      <main className="bg-gray-50 dark:bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          Error {error?.message}
        </div>
      </main>
    );

  return (
    <main className="bg-gray-100 dark:bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-3xl shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-white">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <BuyCard menu={menu?.data} reservationMutation={buyMenu} />

            <div className="flex justify-center items-center mt-2">
              <LinkButton
                href={"/comidas"}
                style="bg-blue-500 hover:bg-blue-700 w-2xl text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                title="Cancelar y volver"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};
