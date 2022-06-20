import useStore from '../store/store';

const TuningDisplay = () => {
  const tuning = useStore((state) => state.tuning);

  return (
    <div className='tuning-display--wrapper w-full'>
      <ul className='tuning-display flex flex-row justify-around'>
        {tuning.map((note, key) => (
          <li
            key={key}
            className={`
              text-center text-[4vw] font-bold text-slate-400 md:text-2xl
            `}
          >
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TuningDisplay;
