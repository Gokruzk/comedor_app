"use client";
import { getUserCard } from "@/api/userAPI";
import NavBar from "@/components/NavBar";
import { Card } from "@/types";
import { getUserSession } from "@/utils";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

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
  const [detail_, setDetail] = useState("[]");

  const fetchCard = useCallback(async () => {
    try {
      const { user } = await getUserSession();
      let user_email = "";
      if (user) user_email = user;

      const { status, data, error, detail } = await getUserCard(user_email);

      if (status === 200) {
        setCard(data); // Actualiza el estado con los datos del menú
        setDetail("");
      } else if (status === 404) {
        setDetail(detail);
      } else {
      }
    } catch (error_) {
      console.log(error_);
    }
  }, [setCard, setDetail]);

  useEffect(() => {
    fetchCard();
  }, [fetchCard]);

  const linkbuttons = [
    { href: "/agregar_tarjeta", title: "Agregar tarjeta" },
  ];

  let cardData: any = {};

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
  } else {
    if (card) cardData = card;
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
              {cardData.card_number}
            </p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div>
                <p className="font-light text-xs">Valida hasta</p>
                <p className="font-medium tracking-wider text-sm">
                  {cardData.exp_month}/{cardData.exp_year}
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
              {/* {cardData.saldo} */}
              $0
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Agrega saldo a tu cuenta
          </h2>
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $6,592.00
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-500">
                      -$299.00
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $99
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $799
                    </dd>
                  </dl>
                </div>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    $7,191.00
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
