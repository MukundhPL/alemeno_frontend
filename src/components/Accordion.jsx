import React, { useState } from "react";

const Accordion = ({ title, content, color}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className={`p-2 bg-sky-${color} text-white text-2xl font-medium my-5 rounded-2xl `}>
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full"
      >
        <span className="ml-2 mt-2">{title}</span>
        {accordionOpen ? <span className="ml-2 mt-2 mr-2" >-</span> : <span className="ml-2 mt-2 mr-2">+</span>}
        {/* <svg
          className="fill-indigo-500 shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg> */}
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out mt-2 text-lg ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;