const Nut: React.FC<{}> = ({}) => {
  return (
    <div
      className={`
          note-overlay__nut
          relative z-0 pointer-events-none
         bg-slate-400 rounded-t-lg -mx-1 -mt-1
      `}
    />
  );
};

export default Nut;
