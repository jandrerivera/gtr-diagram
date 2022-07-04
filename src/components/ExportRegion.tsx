interface ExportRegionTypes {
  children: React.ReactNode;
}

const ExportRegion: React.FC<ExportRegionTypes> = ({ children }) => {
  return (
    <div
      id='exportRegion'
      // max-h-[70rem] w-full max-w-3xl
      // flex items-center justify-center
      className={`
          w-full
          bg-white
          py-20
        `}
    >
      {children}
    </div>
  );
};

export default ExportRegion;
