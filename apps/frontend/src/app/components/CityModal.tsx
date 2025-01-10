import { City } from "../../types/city";
import { CityState } from "../../types/cityStates";
import { FormInput } from "./FormInput";
import Modal from "./Modal";

interface CityModalProps {
  title: string;
  currentCity: City;
  CityStates: CityState[];
  onChangeName: (value: string) => void;
  onChangeState: (value: string) => void;
  handleCancel: () => void;
  handleSave: () => void;
}

export const CityModal = (props: CityModalProps) => {
  return (
    <Modal
      title={props.title}
      onCancel={props.handleCancel}
      onSave={props.handleSave}
    >
      <div className="mb-4">
        <label className="block text-white">Nome do Estado</label>
        <FormInput
          value={props.currentCity.name}
          onChange={(e) => props.onChangeName(e)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white">Estado</label>
        <select
          value={props.currentCity.stateId}
          onChange={(e) => props.onChangeState(e.target.value)}
          className="mt-1 p-2 border rounded w-full text-black"
        >
          <option className="text-black" value="">
            Selecione o estado
          </option>
          {props.CityStates.map((CityState) => (
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
    </Modal>
  );
};
