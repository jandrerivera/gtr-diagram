type FretsProps = {
  frets: number;
};

const Frets: React.FC<FretsProps> = ({ frets }) => {
  return (
    <div
      className={`
        w-full h-full 
        grid grid-rows-5 items-end
      `}
    >
      {[...Array(frets - 1)].map((_, key) => (
        <Fret key={key} />
      ))}
    </div>
  );
};
export default Frets;

const Fret = () => {
  return (
    <div
      className={`
        w-full bg-slate-400 h-1
      `}
    />
  );
};
