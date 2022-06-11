type StringsProps = {
  strings: number;
};

const Strings: React.FC<StringsProps> = ({ strings }) => {
  return (
    <div
      className={`
        absolute inset-0
        flex flex-row justify-between
      `}
      // grid grid-cols-5 grid-rows-1 items-end
    >
      {[...Array(strings)].map((_, i) => (
        <String key={i} i={i} />
      ))}
    </div>
  );
};
export default Strings;

type StringProps = {
  i: number;
};

const String: React.FC<StringProps> = ({ i }) => {
  const opacity = i === 5 || i === 0 ? 'opacity-0' : '';

  return (
    <div
      className={`
        ${opacity}
        h-full bg-slate-400 w-1
        justify-self-center
      `}
    />
  );
};
