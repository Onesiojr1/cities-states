"use client";
import { useEffect, useState } from "react";
import { CityState } from "../../types/cityStates";
import Main from "../components/main";
import Modal from "../components/Modal";

export default function Home() {
  const [CityStates, setCityStates] = useState<CityState[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentState, setCurrentState] = useState<
    CityState | { id: null; name: string; acronym: string }
  >({
    id: null as string | null,
    name: "",
    acronym: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const statesResponse = await fetch("http://localhost:8000/state/");
        const statesData = await statesResponse.json();

        setCityStates(statesData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchStates();
  }, []);

  const addCityState = () => {
    setCurrentState({ id: null, name: "", acronym: "" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const editCityState = (cityState: CityState) => {
    setCurrentState(cityState);
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
    setCurrentState({ id: null, name: "", acronym: "" });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentState({ id: null, name: "", acronym: "" });
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
    <Main>
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
        <Modal
          title={isEditing ? "Editar Estado" : "Adicionar Estado"}
          onCancel={handleCancel}
          onSave={handleSave}
        >
          <div className="mb-4">
            <label className="block text-white">Nome do Estado</label>
            <input
              type="text"
              value={currentState.name}
              onChange={(e) =>
                setCurrentState({ ...currentState, name: e.target.value })
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
                setCurrentState({ ...currentState, acronym: e.target.value })
              }
              className="mt-1 p-2 border rounded w-full text-black"
            />
          </div>
        </Modal>
      )}
    </Main>
  );
}
