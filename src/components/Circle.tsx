interface CircleProps {
  label?: String;
}

const Circle: React.FC<CircleProps> = ({ label = '' }) => {
  return (
    <div
      className={`
        rounded-full bg-slate-700 aspect-square w-1/2
        flex justify-center items-center text-2xl font-bold text-white
      `}
    >
      {label}
    </div>
  );
};
export default Circle;
