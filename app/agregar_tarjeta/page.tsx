"use client";
import Image from "next/image";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { Card, CardUser } from "@/types";
import { addCard } from "@/api/userAPI";
import { getUserSession } from "@/utils";
import LinkButton from "@/components/LinkButton";
import Link from "next/link";

const queryClient = new QueryClient();

export default function AddCardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <AgregarTarjetaPage />
    </QueryClientProvider>
  );
}

const AgregarTarjetaPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const addNewCard = async (formdata: any) => {
    const card_number = formdata.card_number;
    const exp = formdata.card_expiration;
    const [month, year] = exp.split("/");

    const { user } = await getUserSession();
    const email = user;

    let user_email = "";
    if (email) user_email = email;

    let cardData: CardUser = {
      email: user_email,
      card_number: card_number,
      exp_month: month,
      exp_year: year,
    };

    addCardMutation.mutate({
      ...cardData,
    });
  };

  const showToastMessage = (mensaje: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(mensaje);
      setTimeout(() => {
        router.push("/cuenta_info");
      }, 1500);
    } else {
      toast.error(mensaje);
    }
  };

  const addCardMutation = useMutation({
    mutationFn: addCard,
    onSuccess: (data) => {
      if (data.status === 200) {
        showToastMessage("Tu tarjeta se agregó correctamente", "success");
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
    <section className="bg-gray-50 dark:bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-3xl shadow-2xl dark:border md:mt-0 sm:max-w-4xl xl:p-0 dark:border-white justify-center items-center">

         <div className="p-6 space-y-4  md:space-y-6 sm:p-8">
            <form
              onSubmit={handleSubmit(addNewCard)}
              className="space-y-4 md:space-y-6"
            >
              <div className="mt-6 flex items-center justify-center gap-8">
                <Image width={40} height={20} src="/amex.svg" alt="" />
                <Image width={40} height={20} src="/mastercard.svg" alt="" />
                <Image width={40} height={20} src="/visa.svg" alt="" />
              </div>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="full_name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-600"
                  >
                    {" "}
                    Propietario de la tarjeta*{" "}
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    {...register("full_name")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombre Apellido"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="card_number"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-600"
                  >
                    {" "}
                    Número de tarjeta*{" "}
                  </label>
                  <input
                    type="text"
                    id="card_number"
                    {...register("card_number")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="card_expiration"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-600"
                  >
                    Fecha de expiracion*{" "}
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                      <svg
                        className="h-4 w-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      datepicker-format="mm/yy"
                      id="card_expiration"
                      type="text"
                      {...register("card_expiration")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="mm/yy"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="cvv-input"
                    className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-gray-600"
                  >
                    CVV*
                    <button
                      data-tooltip-target="cvv-desc"
                      data-tooltip-trigger="hover"
                      className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                    >
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="cvv-desc"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      The last 3 digits on back of card
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </label>
                  <input
                    type="number"
                    id="cvv-input"
                    {...register("cvv")}
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••"
                    required
                  />
                </div>
              </div>


              <div className="flex justify-around items-center ">

                <Link href={"/cuenta_info"} className="bg-red-600 hover:bg-red-700 w-60 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Cancelar y volver
                </Link>

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 w-60 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Agregar tarjeta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};
