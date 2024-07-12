import { BuyCardProps } from "@/types";
import React from "react";

const BuyCard: React.FC<BuyCardProps> = ({ menu, reservationMutation }) => {
  return (
    <div>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-600">
        Confirmación de compra
      </h1>
      <div className="space-y-2 mb-4">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-600">
          <span className="font-bold">Título del menú:</span>{" "}
          {menu.menu.menu_title}
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-600">
          <span className="font-bold">Descripción:</span>{" "}
          {menu.menu.menu_description}
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-600">
          <span className="font-bold">Precio:</span> ${menu.menu.price}
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-600">
          <span className="font-bold">Horario:</span> {menu.meal_time.meal_time}{" "}
          ({menu.meal_time.init_hour} - {menu.meal_time.end_hour})
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-600">
          <span className="font-bold">Tipo de menú:</span>{" "}
          {menu.menu_type.menu_type}
        </p>
      </div>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          reservationMutation();
        }}
      >
        <div className="flex justify-center items-center mt-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-800 w-2/3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Confirmar compra
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default BuyCard;
