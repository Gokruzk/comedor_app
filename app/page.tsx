import LinkButton from "@/components/LinkButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="text-black">
      {/*contenedor de las iamgenes y los botones para agregar */}
      <div className="grid-cols-10 gap-14 place-content-around">
        {/*seccion para la imagen de presentacion*/ }
        <div>
          <h1>espacion para imagenes</h1>
        </div>

        {/*botones para login y registro*/}

        <div>
          <LinkButton href="/register" style="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" title="REGISTRARSE"/>
          <LinkButton href="/login" style="focus:outline-none text-white bg-green-700 hover:bg-green-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" title="INICIAR ->"/>
        </div>
      </div>
    </main>
  );
}
