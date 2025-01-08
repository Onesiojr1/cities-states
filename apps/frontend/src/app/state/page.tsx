"use client";
import { useEffect, useState } from "react";

type CityState = {
  id: string;
  name: string;
  acronym: string;
};

export default function Home() {
  const [CityStates, setCityStates] = useState<CityState[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentState, setCurrentCity] = useState<
  CityState | { id: null; name: string; acronym: string }
  >({
    id: null as string | null,
    name: "",
    acronym: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCitiesAndStates = async () => {
      try {
        const statesResponse = await fetch("http://localhost:8000/state/");
        const statesData = await statesResponse.json();

        setCityStates(statesData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchCitiesAndStates();
  }, []);

  const addCityState = () => {
    setCurrentCity({ id: null, name: "", acronym: "" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const editCityState = (cityState: CityState) => {
    setCurrentCity(cityState);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (isEditing && currentState.id !== null) {
      await fetch(`http://localhost:8000/state/${currentState.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      });
    } else {
      console.log(currentState);

      await fetch("http://localhost:8000/state/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: currentState.name,
          acronym: currentState.acronym,
        }),
      });
    }

    const updatedCitiesResponse = await fetch("http://localhost:8000/state/");
    const updatedCitiesData = await updatedCitiesResponse.json();
    setCityStates(updatedCitiesData);

    setIsModalOpen(false);
    setCurrentCity({ id: null, name: "", acronym: "" });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentCity({ id: null, name: "", acronym: "" });
  };

  const deleteCityState = async (id: String) => {
    await fetch(`http://localhost:8000/state/delete/${id}`, {
      method: "DELETE",
    });

    const updatedCitiesResponse = await fetch("http://localhost:8000/state/");
    const updatedCitiesData = await updatedCitiesResponse.json();
    setCityStates(updatedCitiesData);
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <div className="bg-background-light p-6 rounded shadow-md w-1/2">
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Estado</th>
              <th className="border border-gray-300 p-2">Sigla</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {CityStates.map(({ id, name, acronym }) => {
              return (
                <tr key={id}>
                  <td className="border border-gray-300 p-2">{name}</td>
                  <td className="border border-gray-300 p-2">{acronym}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => editCityState({ id, name, acronym })}
                        className="bg-blue-500 text-white p-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteCityState(id)}
                        className="bg-red-500 text-white p-1 rounded"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          onClick={addCityState}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Adicionar Cidade
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-background-dark p-6 rounded shadow-md w-1/3">
              <h2 className="text-lg font-semibold mb-4">
                {isEditing ? "Editar Estado" : "Adicionar Estado"}
              </h2>
              <div className="mb-4">
                <label className="block text-white">Nome do Estado</label>
                <input
                  type="text"
                  value={currentState.name}
                  onChange={(e) =>
                    setCurrentCity({ ...currentState, name: e.target.value })
                  }
                  className="mt-1 p-2 border rounded w-full text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Sigla do estado</label>
                <input
                  type="text"
                  value={currentState.acronym}
                  onChange={(e) =>
                    setCurrentCity({ ...currentState, acronym: e.target.value })
                  }
                  className="mt-1 p-2 border rounded w-full text-black"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white p-2 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
