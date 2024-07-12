"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UserReservation } from "@/types";
import { getDinings } from "@/api/foodAPI";
import { useCallback, useEffect, useState } from "react";
import ReservationCard from "@/components/ReservationCard";
import Loading from "@/components/Loading";
import LinkButton from "@/components/LinkButton";

const queryClient = new QueryClient();

export default function AllReservations() {
  return (
    <QueryClientProvider client={queryClient}>
      <ViewAllReservations />
    </QueryClientProvider>
  );
}

const ViewAllReservations = () => {
  const router = useRouter();
  const [reservations, setReservations] = useState<UserReservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [detail_, setDetail] = useState<string>("[]");

  const fetchReservations = useCallback(async () => {
    try {
      const { status, data, errors, detail } = await getDinings();
      if (status === 200) {
        setIsLoading(false);
        setReservations(data); // Actualiza el estado con los datos del menú
        setDetail(detail);
      } else if (status === 404) {
        setIsLoading(false);
        setDetail(detail);
        setReservations([]);
      } else {
        setIsLoading(false);
        setIsError(true);
        setDetail(detail);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [setIsLoading, setReservations, setDetail, setIsError]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const reservations_: UserReservation[] = [];

  console.log(detail_);

  if (detail_ === "[]") {
    return (
      <main className="bg-white dark:bg-white flex min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">No hay reservaciones</div>
        </div>
      </main>
    );
  } else {
    reservations.map((reservation: UserReservation) => {
      reservations_.push(reservation);
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
      <main className="bg-gray-50 dark:white flex min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">Error</div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white dark:bg-white flex justify-center items-center">
      <div className="flex flex-col  px-20 py-8 mx-auto md:h-screen lg:py-8">
        <div className="w-full  bg-white rounded-lg shadow-2xl dark:border md:mt-0 xl:p-0 dark:bg-gray-100 dark:border-gray-100">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-sm font-light text-gray-500 dark:text-gray-600">
                <LinkButton
                  href="/admin_perfil"
                  style="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  title="<- Volver"
                />
              </p>

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-gray-600">
                Reservas realizadas
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {reservations_.map((reservation) => {
                  return (
                    <ReservationCard
                      key={reservation.reservation.id_reservation}
                      reservations={reservation}
                    />
                  );
                })}
              </div>
            
          </div>
        </div>
      </div>

                  

    </main>
  );
};
