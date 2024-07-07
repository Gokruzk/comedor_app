import LinkButton from "@/components/LinkButton";
import Image from "next/image";
import React, {useState} from "react";

//bg-gradient-to-r from-red-700 from-10% to-white to-60% 
export default function Home() {

  return (
    <main className="text-black h-screen bg-gradient-to-r from-red-600 from-10% to-white to-60% ">
      {/* Contenedor de las imágenes y los botones para agregar */}
      <div className="flex flex-col lg:flex-row items-center justify-center h-screen">

        {/* Sección para la imagen de presentación */}
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <div className="m-4 lg:m-24 animate-pulse">
            {/* Imgs are in public folder */}
            <Image width={500} height={500} src="/ESPOCH.png" alt="" />
          </div>
        </div>

        {/* Texto de presentación y botones */}
        <div className="flex flex-col justify-center items-start m-4 lg:m-10 pl-4 lg:pl-12 space-y-48 w-full lg:w-1/2">
          <div className="text-center lg:text-left">
            <p className="text-gray-900 text-4xl lg:text-9xl dark:text-black font-bold">
              ¡Comedor
            </p>
            <p className="text-gray-900 text-4xl lg:text-9xl dark:text-black font-bold">
              Politécnico!
            </p>
          </div>

          {/* Botones */}
          <div className="flex justify-center lg:justify-start items-center w-full space-x-4 mt-4">
            <LinkButton href="/registro" style="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" title="REGISTRARSE"/>
            <LinkButton href="/login" style="focus:outline-none text-white bg-green-700 hover:bg-green-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" title="INICIAR ->"/>
          </div>
        </div>



      </div>
    </main>
  );
}
