const Triangle = ({ outline = false, label = '' }: { outline?: boolean; label?: String }) => {
  return (
    <div
      className={`
        relative
        rounded-full aspect-square h-3/5
        flex justify-center items-center
      `}
    >
      <span
        className={`relative z-30 top-[15%] text-2xl font-bold ${
          outline ? 'text-slate-700' : 'text-white'
        }`}
      >
        {label}
      </span>
      <svg className='absolute z-10 w-auto h-full stroke-[10px]  ' viewBox='0 0 120 100'>
        <polygon
          className={outline ? 'fill-white' : 'fill-slate-700'}
          points='60,0 120,100 0,100 '
        />
        <path
          className='fill-slate-700'
          d='M59.5,15.6L104.9,92H14.1L59.5,15.6 M59.5,0L0,100h119L59.5,0L59.5,0z'
        />
      </svg>
    </div>
  );
};

export default Triangle;
