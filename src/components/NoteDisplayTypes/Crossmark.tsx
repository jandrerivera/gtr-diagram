import { SymbolComponent } from './index';

const CLASS_NAMES = `absolute top-1/2 h-3 w-full -translate-y-1/2 border-4 border-slate-700`;

const Crossmark = ({ outline = false }: SymbolComponent) => {
  return (
    <div className='grouprelative aspect-square h-3/5 rotate-45'>
      {outline && (
        <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-1 w-1/2 bg-white z-10' />
      )}

      <div className={`${CLASS_NAMES} ${outline ? 'bg-white' : 'bg-slate-700'}`} />
      <div className={`${CLASS_NAMES} ${outline ? 'bg-white' : 'bg-slate-700'} rotate-90`} />
    </div>
  );
};

export default Crossmark;
