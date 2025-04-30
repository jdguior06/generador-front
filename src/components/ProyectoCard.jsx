import { FolderOpen, MoreVertical, Edit, Trash, Share2 } from "lucide-react";
import { useState } from "react";

export default function ProyectoCard({ project, onClick, onDelete, onRename }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setMenuOpen(!menuOpen);
  };

  const handleEdit = async (e) => {
    e.stopPropagation();
    const newName = prompt("Nuevo nombre para el proyecto:", project.name);
    if (!newName || newName.trim() === "" || newName === project.name) return;
  
    try {
      await onRename(project.id, newName.trim());
    } catch (err) {
      console.error(err);
      alert("Error al renombrar el proyecto");
    }
  };
  

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar el proyecto "${project.name}"?`);
    if (!confirmDelete) return;
  
    try {
      await onDelete(project.id);
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el proyecto");
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();

    const shareUrl = `${window.location.origin}/pizarra/${project.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert(`Enlace copiado al portapapeles:\n${shareUrl}`);
    } catch (err) {
      console.error("Error al copiar enlace", err);
      alert("No se pudo copiar el enlace");
    }
  };

  return (
    <div
      onClick={() => onClick(project.id)}
      className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
    >
      {/* Botón de menú */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleMenu}
          className="text-gray-500 hover:text-gray-700"
        >
          <MoreVertical size={20} />
        </button>

        {/* Menú de acciones */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-10">
            <button
              onClick={handleEdit}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Edit size={16} className="mr-2" /> Renombrar
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash size={16} className="mr-2" /> Eliminar
            </button>
            <button
              onClick={handleShare}
              className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
            >
              <Share2 size={16} className="mr-2" /> Compartir
            </button>
          </div>
        )}
      </div>

      {/* Ícono de proyecto */}
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <FolderOpen className="text-blue-600" size={32} />
        </div>
      </div>

      {/* Nombre del proyecto */}
      <h3 className="text-xl font-semibold text-gray-800 text-center truncate">
        {project.name}
      </h3>

      {/* Fecha de creación */}
      <p className="text-sm text-gray-500 mt-2 text-center">
        Creado el{" "}
        {new Date(project.createdAt).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
