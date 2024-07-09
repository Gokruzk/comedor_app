import NavBar from "@/components/NavBar";

export default function Profile() {
  const linkbuttons = [
    { href: "/comidas", title: "Ver menú" },
    { href: "/cuenta", title: "Mi cuenta" },
  ];
  return (
    <main className="bg-gray-50 dark:bg-white min-h-full flex">
      <NavBar
        title="<- Volver"
        href="/"
        nbuttons={2}
        linkbuttons={linkbuttons}
      />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-48 bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-white dark:border-red-600 text-gray-600">
          <div className="px-8 py-3 text-center">
            Vacío
          </div>
        </div>
      </div>
    </main>
  );
}
