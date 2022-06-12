type StringsProps = {
  strings: number;
};

const Strings: React.FC<StringsProps> = ({ strings }) => {
  return (
    <div
      className={`
        absolute inset-0  -mx-1
        flex flex-row justify-between
      `}
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
