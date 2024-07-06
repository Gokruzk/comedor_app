import { BuyCardProps } from "@/types";
import React from "react";

const BuyCard: React.FC<BuyCardProps> = ({ menu, reservationMutation }) => {
  return (
    <div>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Confirmación de compra
      </h1>
      <div className="space-y-2 mb-4">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          <span className="font-bold">Título del menú:</span>{" "}
          {menu.menu.menu_title}
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          <span className="font-bold">Descripción:</span>{" "}
          {menu.menu.menu_description}
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          <span className="font-bold">Precio:</span> ${menu.menu.price}
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          <span className="font-bold">Horario:</span> {menu.meal_time.meal_time}{" "}
          ({menu.meal_time.init_hour} - {menu.meal_time.end_hour})
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Confirmar compra
        </button>
      </form>
    </div>
  );
};

export default BuyCard;
