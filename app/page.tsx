import LinkButton from "@/components/LinkButton";
import Image from "next/image";

//bg-gradient-to-r from-red-700 from-10% to-white to-60% 
export default function Home() {
  return (
    <main className="text-black ">
      {/*contenedor de las iamgenes y los botones para agregar */}
      <div className="grid grid-rows-2 grid-flow-col">

        {/*seccion para la imagen de presentacion*/ }
        <div className="row-span-2 ">
          <div className="m-48 animate-pulse">
            {/* imgs are in public folder */}
            <Image width={500} height={500} src="/ESPOCH.png" alt="" />
          </div>
        </div>

        {/*texto presentacion*/}
        <div className="m-10 pl-12">
          <div className="p-10 ">
            <p className="text-gray-900 text-9xl dark:text-black font-bold">
              ¡Comedor
            </p>
          </div>

          <div className="p-10">
            <p className="text-gray-900 text-9xl dark:text-black font-bold absolute">
              Politécnico!
            </p>
          </div>
        </div>

        {/*botones */}
        <div className="m-10 p-16">
          <div className="p-10 mt-10">
            <LinkButton href="/registro" style="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" title="REGISTRARSE"/>
            <LinkButton href="/login" style="focus:outline-none text-white bg-green-700 hover:bg-green-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" title="INICIAR ->"/>
          </div>¨

          <p className="text-black">
            <LinkButton href=""  style="" title="BORRAR ESTO AL FINAL"/>
          </p>
         </div>
      </div>
    </main>
  );
}
