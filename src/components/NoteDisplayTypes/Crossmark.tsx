interface CrossmarkProps {
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

const Crossmark: React.FC<CrossmarkProps> = ({ type = 'full', label = '' }) => {
  return (
    <div className=' w-3/5 aspect-square rotate-45 relative'>
      <div className='absolute bg-black h-2 w-full top-1/2 -translate-y-1/2' />
      <div className='absolute bg-black h-2 w-full top-1/2 -translate-y-1/2 rotate-90' />
    </div>
  );
};

export default Crossmark;
