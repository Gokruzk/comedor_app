import Link from "next/link"

export default function Recovery() {
  return (
    <main className="bg-gray-50 dark:bg-gray-100  h-screen">
      
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-3xl shadow-2xl dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:border-white  justify-center items-center">
            <div className="p-6 space-y-4 md:space-y-2 sm:p-8">
              <p className="text-sm font-light text-gray-500 dark:text-gray-600">
                <Link href={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  {"<-"} Regresar
                </Link>
              </p>
            </div>

            <div className="p-6 space-y-4 sm:p-8 text-black">
              <p className="text-3xl font-bold">
                ¿Olvidaste tu contraseña?
              </p>
              <p>
                Ingresa tu correo para poder recuperar tu contraseña
              </p>
              
            </div>
            
            <form className="flex items-center max-w-xl mx-auto ">   
              <div className="relative w-full">

                  <input type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingresa tu correo electrónico" required />

              </div>
              
              <button type="submit" className="bg-red-600 hover:bg-red-700 w-2/3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm ml-10 py-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Recuperar cuenta
              </button>

            </form>
        </div>
      </div>
     

    </main>
  )
}
