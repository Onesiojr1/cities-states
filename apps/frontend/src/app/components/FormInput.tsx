interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const FormInput = (props: Props) => {
  return (
    <input
      type="text"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className="mt-1 p-2 border rounded w-full text-black"
    />
  );
};
