"use client";
import { useEffect, useState } from "react";
import { City } from "../types/city";
import { CityState } from "../types/cityStates";


export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [CityStates, setCityStates] = useState<CityState[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState<
    City | { id: null; name: string; stateId: string }
  >({
    id: null as string | null,
    name: "",
    stateId: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCitiesAndStates = async () => {
      try {
        const citiesResponse = await fetch("http://localhost:8000/city/");
        const statesResponse = await fetch("http://localhost:8000/state/");
        const citiesData = await citiesResponse.json();
        const statesData = await statesResponse.json();

        setCities(citiesData);
        setCityStates(statesData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchCitiesAndStates();
  }, []);

  const addCity = () => {
    setCurrentCity({ id: null, name: "", stateId: "" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const editCity = (city: City) => {
    setCurrentCity(city);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (isEditing && currentCity.id !== null) {
      await fetch(`http://localhost:8000/city/${currentCity.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentCity),
      });
    } else {
      console.log(currentCity);

      await fetch("http://localhost:8000/city/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: currentCity.name,
          stateId: currentCity.stateId,
        }),
      });
    }

    const updatedCitiesResponse = await fetch("http://localhost:8000/city/");
    const updatedCitiesData = await updatedCitiesResponse.json();
    setCities(updatedCitiesData);

    setIsModalOpen(false);
    setCurrentCity({ id: null, name: "", stateId: "" });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentCity({ id: null, name: "", stateId: "" });
  };

  const deleteCity = async (id: String) => {
    await fetch(`http://localhost:8000/city/delete/${id}`, {
      method: "DELETE",
    });

    const updatedCitiesResponse = await fetch("http://localhost:8000/city/");
    const updatedCitiesData = await updatedCitiesResponse.json();
    setCities(updatedCitiesData);
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <div className="bg-background-light p-6 rounded shadow-md w-1/2">
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Cidade</th>
              <th className="border border-gray-300 p-2">Estado</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cities.map(({ id, name, stateId }) => {
              const stateName =
                CityStates.find((CityState) => CityState.id === stateId)
                  ?.acronym || "";
              return (
                <tr key={id}>
                  <td className="border border-gray-300 p-2">{name}</td>
                  <td className="border border-gray-300 p-2">{stateName}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => editCity({ id, name, stateId })}
                        className="bg-blue-500 text-white p-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteCity(id)}
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
          onClick={addCity}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Adicionar Cidade
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-background-dark p-6 rounded shadow-md w-1/3">
              <h2 className="text-lg font-semibold mb-4">
                {isEditing ? "Editar Cidade" : "Adicionar Cidade"}
              </h2>
              <div className="mb-4">
                <label className="block text-white">Cidade</label>
                <input
                  type="text"
                  value={currentCity.name}
                  onChange={(e) =>
                    setCurrentCity({ ...currentCity, name: e.target.value })
                  }
                  className="mt-1 p-2 border rounded w-full text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Estado</label>
                <select
                  value={currentCity.stateId}
                  onChange={(e) =>
                    setCurrentCity({ ...currentCity, stateId: e.target.value })
                  }
                  className="mt-1 p-2 border rounded w-full text-black"
                >
                  <option className="text-black" value="">
                    Selecione o estado
                  </option>
                  {CityStates.map((CityState) => (
                    <option
                      key={CityState.id}
                      value={CityState.id}
                      className="text-black"
                    >
                      {CityState.acronym} - {CityState.name}
                    </option>
                  ))}
                </select>
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
