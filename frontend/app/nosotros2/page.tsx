import LinkButton from "@/components/LinkButton";

export default function AboutUs() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-10 text-gray-600 text-justify">
      <div className="bg-white p-6 md:p-12 lg:p-16 rounded-3xl shadow-2xl max-w-5xl">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            ¿Qué es el sistema de reserva de tickets?
          </h2>
          <p className="text-lg mb-4">
            Nuestro nuevo sistema permite a los estudiantes, docentes y personal
            administrativo de la ESPOCH reservar sus comidas en el comedor
            politécnico de manera anticipada, garantizando su acceso a una
            alimentación saludable y balanceada. Este sistema ha sido
            implementado con el objetivo de mejorar la eficiencia y la
            organización en la gestión del comedor, ofreciendo una solución
            moderna y conveniente para toda la comunidad politécnica.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">¿Cómo funciona?</h2>
          <ol className="list-decimal list-inside text-lg mb-4">
            <li>
              <span className="font-semibold">Registro y Acceso:</span> Los
              usuarios deben registrarse en el sistema utilizando sus
              credenciales institucionales. Una vez registrados, pueden acceder
              al sistema con su usuario y contraseña.
            </li>
            <li>
              <span className="font-semibold">Selección de Comidas:</span> Los
              usuarios pueden seleccionar el menú de su preferencia para un día
              específico. El sistema ofrece una vista previa de los menús
              disponibles, permitiendo a los usuarios tomar decisiones
              informadas.
            </li>
            <li>
              <span className="font-semibold">Pago Anticipado:</span> Una vez
              seleccionada la comida, el usuario puede proceder al pago
              anticipado a través de la plataforma. El sistema acepta diversos
              métodos de pago para mayor comodidad.
            </li>
            <li>
              <span className="font-semibold">Reserva Confirmada:</span> Después
              de realizar el pago, el usuario recibe un ticket digital que
              confirma su reserva. Este ticket debe ser presentado en el comedor
              el día de la reserva.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Beneficios</h2>
          <ul className="list-disc list-inside text-lg mb-4">
            <li>
              <span className="font-semibold">Eficiencia:</span> El sistema
              reduce el tiempo de espera en las filas del comedor y asegura que
              todos los usuarios reciban su comida a tiempo.
            </li>
            <li>
              <span className="font-semibold">Comodidad:</span> Los usuarios
              pueden reservar sus comidas desde cualquier lugar y en cualquier
              momento.
            </li>
            <li>
              <span className="font-semibold">Transparencia:</span> El pago
              anticipado permite una mejor gestión financiera del comedor y
              asegura que los recursos se utilicen de manera eficiente.
            </li>
            <li>
              <span className="font-semibold">Sostenibilidad:</span> Al conocer
              con anticipación la demanda diaria, el comedor puede planificar
              mejor la preparación de alimentos, reduciendo el desperdicio.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Contacto</h2>
          <p className="text-lg mb-4">
            Si tienes alguna duda o necesitas asistencia con el sistema, no
            dudes en contactarnos a través del correo{" "}
            <a
              href="mailto:soporte@espoch.edu.ec"
              className="text-blue-500 underline"
            >
              soporte@espoch.edu.ec
            </a>{" "}
            o llamando al{" "}
            <a href="tel:+59332998200" className="text-blue-500 underline">
              +593 3 2998 200
            </a>
            .
          </p>
        </section>

        <div className="flex justify-center items-center">
          <LinkButton
            href="/perfil"
            style="bg-green-600 hover:bg-green-700 max-w-48 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            title="Entendido"
          />
        </div>
      </div>
    </div>
  );
}
