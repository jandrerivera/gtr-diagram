import { SymbolComponent } from './index';

const Crossmark = ({ outline = false }: SymbolComponent) => {
  return (
    <div className={` relative aspect-square h-4/5 `}>
      <svg viewBox='0 0 120 120'>
        {!outline && (
          <polygon
            className='fill-slate-700'
            points='109 24.826 94.874 10.7 60 45.574 25.126 10.7 11 24.826 45.874 59.7 11 94.574 25.126 108.7 60 73.826 94.874 108.7 109 94.574 74.126 59.7 109 24.826'
          />
        )}
        {outline && (
          <polygon
            className='fill-white stroke-slate-700 stroke-[6.5px]'
            points='103.445 28.78 90.92 16.255 60 47.175 29.08 16.255 16.555 28.78 47.475 59.7 16.555 90.62 29.08 103.145 60 72.225 90.92 103.145 103.445 90.62 72.525 59.7 103.445 28.78'
          />
        )}
      </svg>
    </div>
  );
};

export default Crossmark;
