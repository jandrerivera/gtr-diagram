const TuningDisplay = () => {
  const tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
  return (
    <ul
      className={`
        note-overlay__tuning-display
        flex flex-row justify-around
      `}
    >
      {tuning.map((note, key) => (
        <li
          key={key}
          className={`
            text-center text-2xl text-slate-400 font-bold
          `}
        >
          {note}
        </li>
      ))}
    </ul>
  );
};
export default TuningDisplay;
