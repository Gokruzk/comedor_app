"use client";

import LinkButton from "@/components/LinkButton";
import Loading from "@/components/Loading";
import { APP_NAME } from "@/constants";

const UsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <header>
        
      </header>
      {children}
    </main>
  );
};

export default UsLayout;
