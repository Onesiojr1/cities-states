import { CityState } from "../../types/cityStates";
import { FormInput } from "./FormInput";
import Modal from "./Modal";

interface StateModalProps {
  title: string;
  currentState: CityState;
  onChangeName: (value: string) => void;
  onChangeAcronym: (value: string) => void;
  handleCancel: () => void;
  handleSave: () => void;
}

export const StateModal = (props: StateModalProps) => {
  return (
    <Modal
      title={props.title}
      onCancel={props.handleCancel}
      onSave={props.handleSave}
    >
      <div className="mb-4">
        <label className="block text-white">Nome do Estado</label>
        <FormInput
          value={props.currentState.name}
          onChange={(e) => props.onChangeName(e)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white">Sigla do estado</label>
        <FormInput
          value={props.currentState.acronym}
          onChange={(e) => props.onChangeAcronym(e)}
        />
      </div>
    </Modal>
  );
};
