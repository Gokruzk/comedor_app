import NavBar from "@/components/NavBar";

export default function AdminProfile() {
  const linkbuttons = [
    { href: "/admin_comidas", title: "Ver menús" },
    { href: "/admin_reservaciones", title: "Ver reservaciones" },
    { href: "/verificar_reserva", title: "Verificar reservación" },
  ];
  return (
    <main className="bg-gray-50 dark:bg-white min-h-full flex">
      <NavBar
        title=""
        href="/admin_perfil"
        nbuttons={3}
        linkbuttons={linkbuttons}
      />
      <div className="flex-grow flex items-center justify-center text-gray-600">
        Perfil de administrador
      </div>
    </main>
  );
}
