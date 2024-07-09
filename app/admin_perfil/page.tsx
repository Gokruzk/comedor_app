import LinkButton from "@/components/LinkButton";
import NavBar from "@/components/NavBar";

export default function AdminProfile() {
  const linkbuttons = [
    { href: "/admin_comidas", title: "Ver menús" },
    { href: "/admin_reservaciones", title: "Ver reservaciones" },
    { href: "/verificar_reserva", title: "Verificar reservación" },
  ];
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-full flex">
      <NavBar
        title="<- Volver"
        href="/"
        nbuttons={3}
        linkbuttons={linkbuttons}
      />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="pl-8 pt-3">Vacío</div>
        </div>
      </div>
    </main>
  );
}
