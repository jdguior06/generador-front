import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function PageManager({
  pages,
  setPages,
  currentPageId,
  setCurrentPageId,
}) {
  const [editingPageId, setEditingPageId] = useState(null);
  const [newPageName, setNewPageName] = useState("");

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

  const handleRenamePage = (id, newName) => {
    if (!newName.trim()) {
      setEditingPageId(null);
      return;
    }

    setPages(
      pages.map((page) => (page.id === id ? { ...page, name: newName } : page))
    );
    setEditingPageId(null);
  };

  const handleDeletePage = (id) => {
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
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-700">Páginas</h2>
        <button
          onClick={handleCreatePage}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus size={16} /> Nueva
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-2">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`group flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                page.id === currentPageId
                  ? "bg-blue-50 border border-blue-200"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              {editingPageId === page.id ? (
                <input
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  onBlur={() => handleRenamePage(page.id, newPageName)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      handleRenamePage(page.id, newPageName);
                    if (e.key === "Escape") setEditingPageId(null);
                  }}
                  autoFocus
                  className="border p-1 rounded text-sm w-full"
                />
              ) : (
                <span
                  onClick={() => setCurrentPageId(page.id)}
                  className={`text-sm cursor-pointer truncate flex-1 ${
                    page.id === currentPageId
                      ? "font-medium text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  {page.name}
                </span>
              )}
              <div
                className={`flex gap-2 ml-2 ${
                  page.id !== currentPageId
                    ? "opacity-0 group-hover:opacity-100"
                    : ""
                } transition-opacity`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingPageId(page.id);
                    setNewPageName(page.name);
                  }}
                  className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                  title="Renombrar página"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePage(page.id);
                  }}
                  className="p-1 rounded hover:bg-red-100 text-gray-500 hover:text-red-600"
                  title="Eliminar página"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 border-t bg-gray-50">
        <p className="text-xs text-gray-500">
          {pages.length} {pages.length === 1 ? "página" : "páginas"} •
          {pages.reduce(
            (acc, page) => acc + (page.elements ? page.elements.length : 0),
            0
          )}{" "}
          elementos
        </p>
      </div>
    </div>
  );
}
