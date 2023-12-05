import React, { useState } from "react";
import Inicio from "@/pages/dashboard";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="flex-grow p-4">
      <Inicio />
    </main>
  );
};

export default Home;
