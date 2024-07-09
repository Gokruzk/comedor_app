"use client";
import { getUserBalance, getUserCard, setUserBalance } from "@/api/userAPI";
import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import { Balance, Card } from "@/types";
import { getUserSession } from "@/utils";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function CuentaIn() {
  return (
    <QueryClientProvider client={queryClient}>
      <CuentaInfo />
    </QueryClientProvider>
  );
}

function CuentaInfo() {
  const [card, setCard] = useState<Card>();
  const [userBalance, setBalance] = useState(0);
  const [detail_, setDetail] = useState("[]");
  const [user_email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { register, handleSubmit, watch } = useForm();

  const fetchCard = useCallback(async () => {
    try {
      const { user } = await getUserSession();
      if (user) setEmail(user);

      const { status, data, error, detail } = await getUserCard(user_email);

      if (status === 200) {
        setCard(data); // Actualiza el estado con los datos del menú
        setDetail("");
        setIsLoading(false);
      } else if (status === 404) {
        setDetail(detail);
      } else {
      }
    } catch (error_) {
      console.log(error_);
      setIsLoading(false);
    }
  }, [user_email]);

  useEffect(() => {
    fetchCard();
  }, [fetchCard]);

  const fetchBalance = useCallback(async () => {
    try {
      const { status, data, error, detail } = await getUserBalance(user_email);
      if (status === 200) {
        setBalance(data); // Actualiza el estado con los datos del menú
      } else if (status === 404) {
        setBalance(0);
      } else {
      }
    } catch (error_) {
      console.log(error_);
    }
  }, [user_email]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    handleAddBalance;
  });

  const handleAddBalance = async (data: any) => {
    const newUserBalance: Balance = {
      email: user_email,
      new_balance: data.newBalance,
    };
    setBalance(Number(userBalance) + Number(data.newBalance));

    setBalanceMutation.mutate({
      ...newUserBalance,
    });
  };

  const showToastMessage = (mensaje: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(mensaje);
    } else {
      toast.error(mensaje);
    }
  };

  const setBalanceMutation = useMutation({
    mutationFn: setUserBalance,
    onSuccess: (data) => {
      if (data.status === 200) {
        showToastMessage("Tú saldo se actualizó correctamente", "success");
      } else {
        showToastMessage(`${data.error}`, "error");
      }
    },
    onError: (error) => {
      console.log(error);
      showToastMessage(`${error}`, "error");
    },
  });

  const linkbuttons = [{ href: "/agregar_tarjeta", title: "Agregar tarjeta" }];

  let cardData = card;
  let userBalanceFetched = userBalance;

  if (isLoading) {
    return <Loading />;
  }

  if (detail_ === "[]") {
    return (
      <main className="bg-gray-50 dark:bg-gray-900 min-h-screen flex">
        <NavBar
          title="<- Volver"
          href="/cuenta"
          nbuttons={1}
          linkbuttons={linkbuttons}
        />
        <div className="flex-1 p-6">
          <h2 className="text-xl font-bold mb-4">
            No hay una tarjeta agregada
          </h2>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen flex">
      <NavBar
        title="<- Volver"
        href="/perfil"
        nbuttons={2}
        linkbuttons={linkbuttons}
      />
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Información de la tarjeta</h2>
        <div className="w-80 bg-blue-700 rounded-xl relative text-white shadow-2xl p-6">
          <div className="pt-1">
            <p className="font-light">Número de tarjeta</p>
            <p className="font-medium tracking-more-wider">
              {cardData?.card_number}
            </p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div>
                <p className="font-light text-xs">Valida hasta</p>
                <p className="font-medium tracking-wider text-sm">
                  {cardData?.exp_month}/{cardData?.exp_year}
                </p>
              </div>
              <div>
                <p className="font-light text-xs">CVV</p>
                <p className="font-bold tracking-more-wider text-sm">...</p>
              </div>
            </div>
          </div>
          <div className="py-6">
            <p className="font-light">Saldo en tu cuenta comedor</p>
            <p className="font-medium tracking-more-wider">
              ${userBalanceFetched}
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Agrega saldo a tu cuenta
          </h2>
          <form onSubmit={handleSubmit(handleAddBalance)}>
            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <div className="mt-6 grow sm:mt-8 lg:mt-0">
                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Saldo que quieres agregar
                      </dt>
                      <dd className="text-base font-medium text-green-500">
                        +${watch("newBalance") || 0}
                      </dd>
                    </dl>
                    <input
                      type="number"
                      step="0.01"
                      {...register("newBalance")}
                      className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
                      required
                    />
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Saldo actual
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${userBalance}
                      </dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ${userBalance + (parseFloat(watch("newBalance")) || 0)}
                    </dd>
                  </dl>
                  <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Agregar saldo
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
