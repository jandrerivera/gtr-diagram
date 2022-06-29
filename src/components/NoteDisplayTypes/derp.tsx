type Editable = boolean;

export type OptionsMap = {
  [key: string]: string;
};

export type SetOptions = {
  (options: OptionsMap): void;
};

export type EditableComponentProps = {
  editable: Editable;
  setOptions: SetOptions;
  options: OptionsMap;
};

// I would think this would be highlighted red since it is missing setOptions, but it's not?
export const ColorPicker: React.FC<EditableComponentProps> = ({ editable, options }) => {
  return <></>;
};
