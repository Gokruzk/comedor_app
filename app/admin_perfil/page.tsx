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


      <div className="relative w-full h-screen overflow-hidden">
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl md:text-4xl lg:text-5xl font-bold z-10 p-4">
              Bienvenido al Comedor Politécnico
            </h1>
            <video
              width="100%"
              height="100%"
              autoPlay
              loop
              muted
              className="absolute top-0 left-0 w-full h-full object-cover"
            >
              <source src="/video_esp.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        </div>

    </main>
  );
}
