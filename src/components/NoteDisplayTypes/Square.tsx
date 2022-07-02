import { SymbolComponent } from './index';

const Square = ({ outline = false, label = '' }: SymbolComponent) => {
  return (
    <div className={` relative aspect-square h-4/5 `}>
      <div
        className={`
        absolute inset-0 flex justify-center items-center
        text-2xl font-bold
        ${outline ? 'text-slate-700' : 'text-white'}
        `}
      >
        {label}
      </div>
      <svg viewBox='0 0 120 120'>
        <rect
          className={outline ? 'fill-white ' : 'fill-slate-700 '}
          x='16'
          y='15.7'
          width='88'
          height='88'
        />
        <path
          className='fill-slate-700'
          d='M100.5,19.2V100.2H19.5V19.2H100.5m7-7H12.5V107.2H107.5V12.2h0Z'
        />
      </svg>
    </div>
  );
};

export default Square;
