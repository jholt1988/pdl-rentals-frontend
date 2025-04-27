
import React from 'react';
import { X } from 'lucide-react';

const ModalWrapper = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative animate-scale-in">
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
