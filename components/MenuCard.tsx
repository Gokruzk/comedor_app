import { MenuItem } from "@/types";
import LinkButton from "./LinkButton";

export default function MenuCard({
  menu,
}: {
  menu: MenuItem;
}) {
  return (
    <div className="bg-white dark:bg-white border border-gray-200 dark:border-white rounded-lg shadow-2xl p-6">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-black mb-2">
        {menu.menu.menu_title}
      </h3>
      <p className="text-gray-700 dark:text-gray-600 mb-3">
        Descripción: {menu.menu.menu_description}
      </p>
      <p className="text-gray-700 dark:text-gray-600 mb-3">
        Tipo de menú: {menu.menu_type.menu_type} - {menu.meal_time.meal_time}
      </p>
      <p className="text-gray-700 dark:text-gray-600 mb-3">
        Precio: ${menu.menu.price}
      </p>
      <p className="text-gray-700 dark:text-gray-6  00 mb-3">
        Horario: {menu.meal_time.init_hour} - {menu.meal_time.end_hour}
      </p>
      <div className="flex space-x-2">
        <LinkButton
          href={`/compra/${menu.menu.id_menu}`}
          style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          title="Comprar"
        />
      </div>
    </div>
  );
}
