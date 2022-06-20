const Crossmark = () => {
  return (
    <div className='relative aspect-square h-3/5 rotate-45'>
      <div className='absolute top-1/2 h-2 w-full -translate-y-1/2 bg-black' />
      <div className='absolute top-1/2 h-2 w-full -translate-y-1/2 rotate-90 bg-black' />
    </div>
  );
};

export default Crossmark;
