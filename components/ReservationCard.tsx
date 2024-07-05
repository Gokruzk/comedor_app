import { UserReservation } from "@/types";

export default function ReservationCard({
  reservations,
}: {
  reservations: UserReservation;
}) {
  return (
    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
      <li className="py-3 sm:py-3">
        <div className="flex items-center">
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Usuario: {reservations.user.user.user_name}
            </p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Email: {reservations.user.user.email}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Fecha de reserva: {reservations.reservation.reservation_date}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Hora de reserva: {reservations.reservation.reservation_hour}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Menú: {reservations.menu.menu.menu_title}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            ${reservations.reservation.total_cost}
          </div>
        </div>
      </li>
    </ul>
  );
}
