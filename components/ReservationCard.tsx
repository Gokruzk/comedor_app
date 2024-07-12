import { UserReservation } from "@/types";

export default function ReservationCard({
  reservations,
}: {
  reservations: UserReservation;
}) {
  return (
    <div className="max-w-2xl  bg-green-600 dark:bg-green-600 border border-green-600 dark:border-green-600 rounded-lg shadow-2xl p-4">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-3">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between">
              <div className="flex-1 sm:ms-4 text-center sm:text-left">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Usuario: {reservations.user.user.user_name}
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Email: {reservations.user.user.email}
                </p>
                <p className="text-sm text-white truncate dark:text-white">
                  Fecha de reserva: {reservations.reservation.reservation_date}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-white">
                  Hora de reserva: {reservations.reservation.reservation_hour}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-white">
                  Menú: {reservations.menu.menu.menu_title}
                </p>
              </div>
              <div className="inline-flex items-center text-2xl font-bold text-gray-900 dark:text-white mt-4 sm:mt-0 sm:ml-4">
                ${reservations.reservation.total_cost}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  );
}
