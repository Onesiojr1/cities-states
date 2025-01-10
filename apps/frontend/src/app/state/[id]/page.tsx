"use client";
import { useEffect, useState } from "react";
import { City } from "../../../types/city";
import { CityState } from "../../../types/cityStates";
import Main from "../../components/main";
import { CityModal } from "../../components/CityModal";

type Props = {
  params: {
    id: string;
  };
};

export default function CityByStateIdHomePage(props: Props) {
  const [cities, setCities] = useState<City[]>([]);
  const [CityStates, setCityStates] = useState<CityState[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState<City>({
    id: "",
    name: "",
    stateId: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCitiesAndStates = async () => {
      try {
        const citiesResponse = await fetch(`http://localhost:8000/city/state/${props.params.id}`);
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
    setCurrentCity({ id: "", name: "", stateId: "" });
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
    setCurrentCity({ id: "", name: "", stateId: "" });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentCity({ id: "", name: "", stateId: "" });
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
    <Main>
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
        <CityModal
          title={isEditing ? "Editar Cidade" : "Adicionar Cidade"}
          currentCity={currentCity}
          CityStates={CityStates}
          onChangeName={(value) =>
            setCurrentCity({ ...currentCity, name: value })
          }
          onChangeState={(value) =>
            setCurrentCity({ ...currentCity, stateId: value })
          }
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      )}
    </Main>
  );
}
