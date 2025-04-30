import { Plus, X } from "lucide-react";

export default function PageTabs({
  pages,
  setPages,
  currentPageId,
  setCurrentPageId,
}) {
  const handleCreatePage = () => {
    const newId = `page-${Date.now()}`;
    const newPage = {
      id: newId,
      name: `Nueva Página ${pages.length + 1}`,
      elements: [],
    };
    setPages([...pages, newPage]);
    setCurrentPageId(newId);
  };

  const handleDeletePage = (id, e) => {
    e.stopPropagation();

    if (pages.length <= 1) {
      alert("Debe haber al menos una página.");
      return;
    }

    if (confirm("¿Seguro que quieres eliminar esta página?")) {
      const updatedPages = pages.filter((page) => page.id !== id);
      setPages(updatedPages);
      if (currentPageId === id) {
        setCurrentPageId(updatedPages[0].id);
      }
    }
  };

  return (
    <div className="flex items-center space-x-1 overflow-x-auto max-w-2xl scrollbar-hide">
      {pages.map((page) => (
        <div
          key={page.id}
          className={`flex items-center px-4 py-2 rounded-t-lg cursor-pointer transition-all ${
            page.id === currentPageId
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrentPageId(page.id)}
        >
          <span className="text-sm font-medium truncate max-w-xs">
            {page.name}
          </span>
          {pages.length > 1 && (
            <button
              onClick={(e) => handleDeletePage(page.id, e)}
              className={`ml-2 p-1 rounded-full hover:bg-red-500 hover:text-white transition-colors ${
                page.id === currentPageId ? "text-gray-200" : "text-gray-400"
              }`}
            >
              <X size={14} />
            </button>
          )}
        </div>
      ))}

      <button
        onClick={handleCreatePage}
        className="flex items-center justify-center rounded-full w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white shadow transition-colors flex-shrink-0"
        title="Crear nueva página"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
