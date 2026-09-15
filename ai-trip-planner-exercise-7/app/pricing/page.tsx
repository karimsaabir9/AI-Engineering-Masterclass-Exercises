import { PricingTable } from "@clerk/nextjs";
import React from "react";
import Footer from "../_components/Footer";

function Pricing() {
  return (
    <div className="mt-20 flex flex-col min-h-[70vh]">
      <h2 className="font-bold text-3xl text-center my-5">
        Ai-Powered Trip Planning - Pick Your Plan
      </h2>
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "0 1rem" }}>
        <PricingTable />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Pricing;
