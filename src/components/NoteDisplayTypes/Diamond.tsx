import type { SymbolComponent } from './index';

const Diamond = ({ outline = false, label = '', handleRemoveSelf }: SymbolComponent) => {
  return (
    <div
      className={`
        aspect-square h-3/5 rotate-45
        flex justify-center items-center text-2xl font-bold text-white
        border-4 border-slate-700 
        ${outline ? 'bg-white text-bg-slate-700' : 'bg-slate-700 text-white'}
      `}
      onClick={handleRemoveSelf}
    >
      <span
        className={`relative z-30 -rotate-45 text-2xl font-bold ${
          outline ? 'text-slate-700' : 'text-white'
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default Diamond;
