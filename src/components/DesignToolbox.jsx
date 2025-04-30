import { Rnd } from "react-rnd";
import { useState } from "react";
import {
  PlusCircle,
  Type,
  Square,
  Circle,
  Image as ImageIcon,
  Upload,
  ChevronDown,
  TriangleIcon,
  MinusIcon,
  ToggleLeft,
  Check,
  ListFilter,
  List,
  Table as TableIcon,
  SquareAsterisk,
  RadioIcon,
  FormInput,
  Search,
} from "lucide-react";

export default function DesignToolbox({ handleAddElement }) {
  const [toolboxPosition, setToolboxPosition] = useState({ x: 20, y: 20 });
  const [activeTab, setActiveTab] = useState("basico");
  const [imageUrl, setImageUrl] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [showIconInput, setShowIconInput] = useState(false);

  const handleAddImage = () => {
    if (imageUrl) {
      handleAddElement("imagen", { src: imageUrl });
      setImageUrl("");
      setShowImageInput(false);
    }
  };

  const handleAddIcon = () => {
    if (iconUrl) {
      handleAddElement("icono", { src: iconUrl });
      setIconUrl("");
      setShowIconInput(false);
    }
  };

  return (
    <Rnd
      position={toolboxPosition}
      onDragStop={(e, d) => setToolboxPosition({ x: d.x, y: d.y })}
      default={{
        x: 20,
        y: 20,
        width: "auto",
        height: "auto",
      }}
      enableResizing={false}
      dragHandleClassName="toolbox-handle"
      className="z-50"
    >
      <div className="bg-white shadow-lg rounded-lg border w-64">
        <div className="toolbox-handle cursor-move bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 rounded-t-md flex justify-between items-center">
          <span>Herramientas de Diseño</span>
          <ChevronDown size={16} />
        </div>

        <div className="flex border-b">
          <button
            className={`flex-1 py-1.5 text-sm ${
              activeTab === "basico"
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("basico")}
          >
            Básicos
          </button>
          <button
            className={`flex-1 py-1.5 text-sm ${
              activeTab === "figura"
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("figura")}
          >
            Figuras
          </button>
          <button
            className={`flex-1 py-1.5 text-sm ${
              activeTab === "media"
                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("media")}
          >
            Media
          </button>
        </div>

        <div className="p-2">
          {activeTab === "basico" && (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAddElement("texto")}
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <Type size={14} /> Texto
              </button>
              <button
                onClick={() =>
                  handleAddElement("boton", {
                    text: "Botón",
                    color: "#3b82f6",
                    textColor: "#ffffff",
                    borderRadius: 6,
                    height: 40,
                    width: 100,
                    type: "boton",
                  })
                }
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <SquareAsterisk size={14} /> Botón
              </button>
              <button
                onClick={() =>
                  handleAddElement("input", {
                    text: "Placeholder",
                    color: "#ffffff",
                    textColor: "#9ca3af",
                    borderRadius: 6,
                    height: 40,
                    width: 200,
                    borderWidth: 1,
                    borderColor: "#d1d5db",
                    type: "input",
                  })
                }
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <FormInput size={14} /> Input
              </button>
              <button
                onClick={() =>
                  handleAddElement("checkbox", {
                    text: "Checkbox",
                    color: "#ffffff",
                    textColor: "#000000",
                    borderRadius: 4,
                    height: 30,
                    width: 120,
                    borderWidth: 1,
                    borderColor: "#d1d5db",
                    type: "checkbox",
                  })
                }
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <Check size={14} /> Checkbox
              </button>
              <button
                onClick={() =>
                  handleAddElement("radio", {
                    text: "Radio button",
                    color: "#ffffff",
                    textColor: "#000000",
                    borderRadius: 50,
                    height: 30,
                    width: 120,
                    borderWidth: 1,
                    borderColor: "#d1d5db",
                    type: "radio",
                  })
                }
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <RadioIcon size={14} /> Radio
              </button>
              <button
                onClick={() =>
                  handleAddElement("switch", {
                    text: "Switch",
                    color: "#e5e7eb",
                    textColor: "#000000",
                    borderRadius: 50,
                    height: 30,
                    width: 120,
                    type: "switch",
                  })
                }
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <ToggleLeft size={14} /> Switch
              </button>
              <button
                onClick={() =>
                  handleAddElement("select", {
                    text: "Seleccionar...",
                    color: "#ffffff",
                    textColor: "#000000",
                    borderRadius: 6,
                    height: 40,
                    width: 200,
                    borderWidth: 1,
                    borderColor: "#d1d5db",
                    type: "select",
                  })
                }
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <ListFilter size={14} /> Select
              </button>
              <button
                onClick={() =>
                  handleAddElement("search", {
                    text: "Buscar...",
                    color: "#ffffff",
                    textColor: "#9ca3af",
                    borderRadius: 6,
                    height: 40,
                    width: 200,
                    borderWidth: 1,
                    borderColor: "#d1d5db",
                    type: "search",
                  })
                }
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <Search size={14} /> Search
              </button>
              <button
                onClick={() =>
                  handleAddElement("tabla", {
                    color: "#ffffff",
                    borderWidth: 1,
                    borderColor: "#d1d5db",
                    width: 300,
                    height: 200,
                    type: "tabla",
                  })
                }
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <TableIcon size={14} /> Tabla
              </button>
            </div>
          )}

          {activeTab === "figura" && (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAddElement("rectangulo")}
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <Square size={14} /> Rectángulo
              </button>
              <button
                onClick={() => handleAddElement("circulo")}
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <Circle size={14} /> Círculo
              </button>
              <button
                onClick={() => handleAddElement("linea")}
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <MinusIcon size={14} /> Línea
              </button>
              <button
                onClick={() => handleAddElement("triangulo")}
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <TriangleIcon size={14} /> Triángulo
              </button>
            </div>
          )}

          {activeTab === "media" && (
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setShowImageInput(!showImageInput)}
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <ImageIcon size={14} /> Imagen
              </button>

              {showImageInput && (
                <div className="mt-2 p-2 bg-gray-50 rounded">
                  <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-1 mb-2 text-xs border rounded"
                  />
                  <button
                    onClick={handleAddImage}
                    className="w-full p-1 bg-blue-100 hover:bg-blue-200 rounded text-xs"
                  >
                    <Upload size={12} className="inline mr-1" /> Añadir imagen
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowIconInput(!showIconInput)}
                className="flex items-center gap-1 p-2 bg-gray-50 hover:bg-gray-100 rounded text-xs"
              >
                <PlusCircle size={14} /> Icono externo
              </button>

              {showIconInput && (
                <div className="mt-2 p-2 bg-gray-50 rounded">
                  <input
                    type="text"
                    placeholder="URL del icono (SVG, PNG)"
                    value={iconUrl}
                    onChange={(e) => setIconUrl(e.target.value)}
                    className="w-full p-1 mb-2 text-xs border rounded"
                  />
                  <button
                    onClick={handleAddIcon}
                    className="w-full p-1 bg-blue-100 hover:bg-blue-200 rounded text-xs"
                  >
                    <Upload size={12} className="inline mr-1" /> Añadir icono
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t p-2 text-xs text-gray-500">
          <p>Esc: Deseleccionar</p>
          <p>Ctrl+D: Duplicar elemento</p>
          <p>Delete: Eliminar elemento</p>
        </div>
      </div>
    </Rnd>
  );
}
