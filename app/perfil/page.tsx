import NavBar from "@/components/NavBar";

export default function Profile() {
  const linkbuttons = [
    { href: "/comidas", title: "Ver menús" },
    { href: "/reservaciones", title: "Mis reservaciones" },
    { href: "/cuenta", title: "Mi cuenta" },
  ];
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-full flex">
      <NavBar
        title="<- Regresar"
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
