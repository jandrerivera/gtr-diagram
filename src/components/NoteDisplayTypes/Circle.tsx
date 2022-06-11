interface CircleProps {
  type?: 'full' | 'outline';
  label?: String;
}

const CLASS_NAMES = {
  full: `
        rounded-full aspect-square w-3/5
        flex justify-center items-center text-2xl font-bold text-white
        bg-slate-700 border-4 border-slate-700
      `,
  outline: `
        rounded-full aspect-square w-3/5
        flex justify-center items-center text-2xl font-bold text-white
        bg-white border-4 border-slate-700
      `,
};

const Circle: React.FC<CircleProps> = ({ type = 'full', label = '' }) => {
  return <div className={CLASS_NAMES[type]}>{label}</div>;
};

export default Circle;
