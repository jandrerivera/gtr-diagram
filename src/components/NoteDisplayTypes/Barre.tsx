interface BarreProps {
  span?: number;
  label?: String;
}

const Barre: React.FC<BarreProps> = ({ span = 2, label }) => {
  return (
    <div
      className={`
        h-3/5
        absolute inset-0 top-1/2 -translate-y-1/2
        
    `}
    >
      <div
        className={`
          absolute inset-0 z-20
          rounded-full
          left-1/2 -translate-x-1/2
          w-full text-2xl font-bold text-white
        bg-slate-700 
        `}
        style={{ width: `${((span - 1 / 3) / span) * 100}%` }}
      />
    </div>
  );
};

export default Barre;
