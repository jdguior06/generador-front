import { useState } from "react";
import { Monitor, Smartphone, Tablet, Maximize2, Plus } from "lucide-react";

const DEVICE_FRAMES = [
  { name: "Escritorio", width: 1280, height: 800, icon: <Monitor size={16} /> },
  { name: "Tablet", width: 768, height: 1024, icon: <Tablet size={16} /> },
  { name: "Móvil", width: 390, height: 844, icon: <Smartphone size={16} /> },
];

export default function FrameSelector({
  currentFrame,
  setCurrentFrame,
  addNewFrame,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectFrame = (frame) => {
    setCurrentFrame(frame);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-md shadow-sm hover:bg-gray-50"
      >
        {currentFrame ? (
          <>
            {currentFrame.name}
            <span className="text-xs text-gray-500 ml-1">
              {currentFrame.width} × {currentFrame.height}
            </span>
          </>
        ) : (
          "Seleccionar Frame"
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-60 bg-white border rounded-md shadow-lg z-50">
          <div className="p-2 border-b">
            <h3 className="font-medium text-sm">Seleccionar Frame</h3>
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {/* Frames estándar */}
            {DEVICE_FRAMES.map((frame) => (
              <button
                key={frame.name}
                className="w-full py-2 px-2 text-left text-sm hover:bg-blue-50 rounded flex items-center justify-between mb-1"
                onClick={() => handleSelectFrame(frame)}
              >
                <div className="flex items-center gap-2">
                  {frame.icon}
                  <span>{frame.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {frame.width} × {frame.height}
                </span>
              </button>
            ))}
          </div>

          <div className="p-2 border-t">
            <button
              onClick={() => {
                addNewFrame();
                setIsOpen(false);
              }}
              className="w-full py-1.5 px-2 text-sm flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded"
            >
              <Plus size={14} /> Añadir nuevo frame
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
