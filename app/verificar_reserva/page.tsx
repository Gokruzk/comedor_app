"use client";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { verifyQR } from "@/api/foodAPI";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import LinkButton from "@/components/LinkButton";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function VerifyReservation() {
  return (
    <QueryClientProvider client={queryClient}>
      <VerifyR />
    </QueryClientProvider>
  );
}

const VerifyR = () => {
  const [codeData, setCodeData] = useState();
  const [isScanning, setIsScanning] = useState<boolean>(true);

  const showToastMessage = useCallback(
    (mensaje: string, type: "success" | "error") => {
      if (type === "success") {
        toast.success(mensaje, {});
      } else {
        toast.error(mensaje, {});
      }
    },
    []
  );

  const verifyReservationMutation = useMutation({
    mutationFn: verifyQR,
    onSuccess: (data) => {
      if (data.status === 200 && data.data.valid) {
        showToastMessage("Su compra ha sido verificada", "success");
      } else {
        showToastMessage(data.data.detail, "error");
      }
    },
    onError: (error) => {
      console.log(error);
      showToastMessage(`${error}`, "error");
    },
  });

  useEffect(() => {
    if (codeData && isScanning === true) {
      verifyReservationMutation.mutate(codeData);
      setIsScanning(false);
    }
  }, [codeData, verifyReservationMutation, isScanning]);

  const handleScan = (result: IDetectedBarcode[]) => {
    if (result[0].rawValue) {
      setCodeData(JSON.parse(result[0].rawValue));
    }
  };

  const handleReload = () => {
    setIsScanning(false); // Detiene el escáner
    setTimeout(() => {
      setIsScanning(true); // Reinicia el escáner después de un breve retraso
    }, 100); // Retraso de 100ms para asegurar el reinicio del componente
  };

  return (
    <main className="bg-gray dark:bg-white no-scroll">
      <div className="flex flex-col items-center px-8 py-8 mx-auto md:h-screen lg:py-0 m-32">
        <div className="w-full bg-white rounded-3xl shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-100 dark:border-gray-100">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-sm font-light text-gray-600 dark:text-gray-600">
              <LinkButton
                title="<- Volver"
                href="/admin_perfil"
                style="font-medium text-primary-600 hover:underline dark:text-primary-600"
              />
            </p>
            {isScanning && <Scanner onScan={handleScan} />}
            <button
              onClick={handleReload}
              className="w-40 align-center bg-red-900 block py-2 text-white rounded-xl hover:bg-red-700 md:border-0 dark:text-white md:bg-red-600"
            >
              Recargar
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};
