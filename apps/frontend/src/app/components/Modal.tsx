interface ModalProps {
  children: React.ReactNode;
  title: string;
  onCancel: () => void;
  onSave: () => void;
}

export default function Modal(props: ModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-background-dark p-6 rounded shadow-md w-1/3">
        <h2 className="text-lg font-semibold mb-4">
          {props.title}
        </h2>
        {props.children}
        <div className="flex justify-end">
            <button
              onClick={props.onCancel}
              className="bg-gray-500 text-white p-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              onClick={props.onSave}
              className="bg-green-500 text-white p-2 rounded"
            >
              Salvar
            </button>
          </div>
      </div>
    </div>
  );
}
