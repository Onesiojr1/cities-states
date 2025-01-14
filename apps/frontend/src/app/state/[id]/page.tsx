"use client";
import { use, useEffect, useState } from "react";
import { City } from "../../../types/city";
import { CityState } from "../../../types/cityStates";
import Main from "../../components/main";
import { CityModal } from "../../components/CityModal";
import { useSession } from "next-auth/react";
import { headers } from "next/headers";

export default function CityByStateIdHomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: session } = useSession();
  const [cities, setCities] = useState<City[]>([]);
  const [CityStates, setCityStates] = useState<CityState[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState<City>({
    id: "",
    name: "",
    stateId: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchCitiesAndStates = async () => {
    try {
      const citiesResponse = await fetch(
        `http://localhost:8000/city/state/${id}`,
        {
          headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      const statesResponse = await fetch("http://localhost:8000/state/", {
        headers: {
          authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });
      const citiesData = await citiesResponse.json();
      const statesData = await statesResponse.json();

      if (statesResponse.status === 401) {
        setCityStates([]);
        setCityStates([]);
        throw Error(statesData.message);
      } else {
        setCities(citiesData);
        setCityStates(statesData);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro, tente novamente!"
      );
    }
  };

  useEffect(() => {
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
          authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
        body: JSON.stringify(currentCity),
      });
    } else {
      await fetch("http://localhost:8000/city/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
        body: JSON.stringify({
          name: currentCity.name,
          stateId: currentCity.stateId,
        }),
      });
    }

    fetchCitiesAndStates();

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
      headers: {
        authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    });

    fetchCitiesAndStates();
  };

  return (
    <Main>
      {errorMessage && (
        <div className="bg-red-500 text-white my-2 p-2 rounded flex justify-between items-center">
          {errorMessage}
          <button
            onClick={() => setErrorMessage(null)}
            className="bg-red-500 text-white p-1 rounded"
          >
            X
          </button>
        </div>
      )}
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
