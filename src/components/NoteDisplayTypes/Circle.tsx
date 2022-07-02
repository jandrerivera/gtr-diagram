import { SymbolComponent } from './index';

const Circle = ({ outline = false, label = '' }: SymbolComponent) => {
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
        <circle
          className={outline ? 'fill-white ' : 'fill-slate-700 '}
          cx='60'
          cy='59.7'
          r='46.5'
        />
        <path
          className='fill-slate-700'
          d='M60,16.7c23.71,0,43,19.29,43,43s-19.29,43-43,43S17,83.41,17,59.7,36.29,16.7,60,16.7m0-7c-27.614,0-50,22.386-50,50s22.386,50,50,50,50-22.386,50-50S87.614,9.7,60,9.7h0Z'
        />
      </svg>
    </div>
  );
};

export default Circle;
