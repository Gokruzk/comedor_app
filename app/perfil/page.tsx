import LinkButton from "@/components/LinkButton";

export default function Profile() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              <LinkButton
                title="<- Regresar"
                href="/"
                style="font-medium text-primary-600 hover:underline dark:text-primary-500"
              />
            </p>
          </div>
          <LinkButton
            href={`/horarios`}
            style="ml-9 mb-3 inline-flex items-center px-10 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            title="Horarios"
          />
          <LinkButton
            href={`/comidas`}
            style="ml-9 mb-3 inline-flex items-center px-10 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            title="Comidas"
          />
          <LinkButton
            href={`/descuentos`}
            style="ml-9 mb-3 inline-flex items-center px-7 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            title="Descuentos"
          />
        </div>
      </div>
    </main>
  );
}
