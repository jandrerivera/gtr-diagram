import { SymbolComponent } from './index';

const Triangle = ({ outline = false, label = '' }: SymbolComponent) => {
  return (
    <div className={` relative aspect-square h-4/5 `}>
      <div
        className={`
        absolute inset-0 top-4
        flex justify-center items-center
        text-2xl font-bold
        ${outline ? 'text-slate-700' : 'text-white'}
        `}
      >
        {label}
      </div>
      <svg viewBox='0 0 120 120'>
        <polygon
          className={outline ? 'fill-white ' : 'fill-slate-700 '}
          points='9.521 104.2 60 16.704 110.479 104.2 9.521 104.2'
        />
        <path
          className='fill-slate-700'
          d='M60,23.708l44.419,76.992H15.581L60,23.708m0-14.008L3.462,107.7H116.538L60,9.7h0Z'
        />
      </svg>
    </div>
  );
};

export default Triangle;
