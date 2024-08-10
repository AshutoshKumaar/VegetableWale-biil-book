import React from "react";

function Footer() {
  return (
    <div className="mt-auto bg-[#90EE90] py-10 px-5 opacity-90 text-center">
      <h2 className="text-lg my-2">
        <span className="font-[600]">Copyright@</span>{" "}
        <a href="vegetablewale.in" target="_blank" className="underline text-blue-600 font-[400]">
          VegetableWale
        </a>
      </h2>
      <h4 className="my-2">
        <span className="font-[600]">Developed by</span> <a href="https://www.linkedin.com/in/ashutosh-sinha-679121230/" target="_blank" className="underline text-blue-600 font-[400]">Ashutosh Sinha</a>
      </h4>
    </div>
  );
}

export default Footer;