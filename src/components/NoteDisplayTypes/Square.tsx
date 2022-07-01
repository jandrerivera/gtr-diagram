import type { SymbolComponent } from './index';

const Square = ({ outline = false, label = '', handleRemoveSelf }: SymbolComponent) => {
  return (
    <div
      className={`
        aspect-square h-3/5
        flex justify-center items-center text-2xl font-bold text-white
        border-4 border-slate-700 
        ${outline ? 'bg-white text-bg-slate-700' : 'bg-slate-700 text-white'}

      `}
      onClick={handleRemoveSelf}
    >
      {label}
    </div>
  );
};

export default Square;
