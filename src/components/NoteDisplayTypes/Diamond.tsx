import { SymbolComponent } from './index';

const Diamond = ({ outline = false, label = '' }: SymbolComponent) => {
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
          x='21.781'
          y='21.481'
          width='76.438'
          height='76.438'
          transform='translate(-24.641 59.913) rotate(-45)'
        />
        <path
          className='fill-slate-700'
          d='M60,10.599l49.101,49.101-49.1,49.1L10.9,59.7,60,10.599m0-9.9L1,59.7l59,59,59-59L60,.7h0Z'
        />
      </svg>
    </div>
  );
};

export default Diamond;
