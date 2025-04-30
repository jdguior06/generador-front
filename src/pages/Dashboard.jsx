import { useEffect, useState } from "react";
import {
  fetchProjects,
  createProject,
  deleteProject,
  renameProject,
} from "../services/proyectoService";
import ProjectCard from "../components/ProyectoCard";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut, Search, Loader } from "lucide-react";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProjectName, setNewProjectName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
        alert("Error al cargar los proyectos");
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    setIsCreating(true);
    try {
      const project = await createProject({
        name: newProjectName,
        objetos: {},
      });
      setProjects([project, ...projects]);
      setNewProjectName("");
    } catch (err) {
      console.error(err);
      alert("Error al crear proyecto");
    } finally {
      setIsCreating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleOpenProject = (id) => {
    navigate(`/pizarra/${id}`);
  };

  const handleDeleteProject = async (id) => {
    await deleteProject(id);
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleRenameProject = async (id, newName) => {
    const updated = await renameProject(id, newName);
    setProjects(
      projects.map((p) =>
        p.id === id ? { ...p, name: updated.proyecto.name } : p
      )
    );
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">
            Dashboard de Proyectos
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 py-2 px-4 rounded-lg transition"
          >
            <LogOut size={18} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Control Panel */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-10 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Tus proyectos
              </h2>
              <p className="text-gray-500">
                Gestiona y organiza todos tus proyectos visualmente.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Buscar proyecto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Nombre del nuevo proyecto"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  onClick={handleCreateProject}
                  disabled={isCreating || !newProjectName.trim()}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    <Plus size={18} />
                  )}
                  <span>Crear</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin text-blue-600 mr-2" size={24} />
            <span className="text-gray-600 font-medium">
              Cargando proyectos...
            </span>
          </div>
        ) : (
          <>
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="animate-fade-in-up">
                    <ProjectCard
                      project={project}
                      onClick={() => handleOpenProject(project.id)}
                      onDelete={handleDeleteProject}
                      onRename={handleRenameProject}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center animate-fade-in">
                {searchTerm ? (
                  <div className="text-gray-500">
                    <p className="font-medium text-lg mb-2">
                      No se encontraron resultados
                    </p>
                    <p>No hay proyectos que coincidan con "{searchTerm}"</p>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <p className="font-medium text-lg mb-2">
                      No tienes proyectos aún
                    </p>
                    <p>Crea tu primer proyecto para comenzar</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
