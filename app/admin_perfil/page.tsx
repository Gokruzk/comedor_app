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


      <div className="flex-grow flex flex-col items-center mt-10">
        <h1 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Bienvenido al Comedor Politécnico
        </h1>
        <video
          width="1000"
          height="1000"
          autoPlay
          loop
          muted
          className=""
        >
          <source src="/video_esp.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
 
      </div>

    </main>
  );
}
