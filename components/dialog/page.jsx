import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const DialogComponent = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle dialog visibility transition
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10); // Delay for opening animation
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Handle close event with transition delay
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 100); // Delay to match the transition duration
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 bg-black bg-opacity-50 p-2 flex justify-center items-center transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleClose}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-4 max-w-lg w-full transform transition-transform duration-300 ${
              isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
          >
            <div className="flex justify-end w-full">
              <X className="cursor-pointer" onClick={handleClose} />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default DialogComponent;
