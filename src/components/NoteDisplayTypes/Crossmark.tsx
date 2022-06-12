const Crossmark = () => {
  return (
    <div className='w-3/5 aspect-square rotate-45 relative'>
      <div className='absolute bg-black h-2 w-full top-1/2 -translate-y-1/2' />
      <div className='absolute bg-black h-2 w-full top-1/2 -translate-y-1/2 rotate-90' />
    </div>
  );
};

export default Crossmark;
