import Fretwire from './Fretwire';

type FretsProps = {
  frets: number;
};

const Frets: React.FC<FretsProps> = ({ frets }) => {
  return (
    <div
      className={`
        w-full h-full 
        grid grid-rows-5 items-start -mb-1
      `}
    >
      {[...Array(frets)].map((_, key) => (
        <Fretwire key={key} />
      ))}
    </div>
  );
};

export default Frets;
