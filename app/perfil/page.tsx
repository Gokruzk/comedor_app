import LinkButton from "@/components/LinkButton";

export default function Profile() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-full flex">
      <nav className="w-64 bg-white dark:bg-gray-800 shadow-md h-screen p-4">
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          <LinkButton
            title="<- Regresar"
            href="/"
            style="font-medium text-primary-600 hover:underline dark:text-primary-500"
          />
        </p>
        <ul className="mt-8">
          <li className="mb-4">
            <LinkButton
              href="/comidas"
              style="py-2.5 px-5 ml-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              title="Ver menús"
            />
          </li>
          {/* <li className="mb-4">
            <LinkButton
              href={`/descuentos`}
              style="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              title="Descuentos"
            />
          </li>
          <li className="mb-4">
            <LinkButton
              href={`/horarios`}
              style="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              title="Horarios"
            />
          </li> */}
        </ul>
      </nav>
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="pl-8 pt-3"></div>
        </div>
      </div>
    </main>
  );
}
