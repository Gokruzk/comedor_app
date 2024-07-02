import LinkButton from "@/components/LinkButton";

export default function Profile() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="pl-8 pt-3">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              <LinkButton
                title="<- Regresar"
                href="/"
                style="font-medium text-primary-600 hover:underline dark:text-primary-500"
              />
            </p>
          </div>
          <LinkButton
            href={`/comidas`}
            style="mx-9 my-3 inline-flex items-center px-10 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            title="Comidas"
          />
          {/* <LinkButton
            href={`/descuentos`}
            style="m-3 mr-9 inline-flex items-center px-7 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            title="Descuentos"
          />
          <LinkButton
            href={`/horarios`}
            style="m-3 mr-9 inline-flex items-center px-7 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            title="Horarios"
          /> */}
        </div>
      </div>
    </main>
  );
}
