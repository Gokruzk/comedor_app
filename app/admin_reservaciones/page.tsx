"use client";

import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UserReservation } from "@/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDinings } from "@/api/foodAPI";
import { useCallback, useEffect, useState } from "react";
import ReservationCard from "@/components/ReservationCard";

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
  const [error, setError] = useState<any>(null);
  const [detail_, setDetail] = useState<string>("[]");

  const fetchReservations = useCallback(async () => {
    try {
      const { status, data, error, detail } = await getDinings();

      if (status === 200) {
        setDetail("");
        setIsLoading(false);
        setReservations(data); // Actualiza el estado con los datos del menú
      } else if (status === 404) {
        setIsLoading(false);
        setDetail(detail);
        setReservations([]);
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
  }, [setIsLoading, setReservations, setDetail, setIsError, setError]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const reservations_: UserReservation[] = [];

  if (detail_ === "[]") {
    return (
      <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">No hay reservaciones</div>
        </div>
        <ToastContainer />
      </main>
    );
  } else {
    reservations.map((reservation: UserReservation) => {
      reservations_.push(reservation);
    });
  }

  if (isLoading) {
    return (
      <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
        <ToastContainer />
      </main>
    );
  } else if (isError) {
    return (
      <main className="bg-gray-50 dark:bg-gray-900 flex min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">Error {error.message}</div>
        </div>
        <ToastContainer />
      </main>
    );
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-20 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              <Link
                href={"/admin_perfil"}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                {"<-"} Regresar
              </Link>
            </p>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reservas realizadas
            </h1>
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
      <ToastContainer />
    </main>
  );
};
