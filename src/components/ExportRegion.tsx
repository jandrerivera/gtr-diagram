import { forwardRef } from 'react';

interface ExportRegionTypes {
  children: React.ReactNode;
}

// const ExportRegion: React.FC<ExportRegionTypes> = ({ children }, ref) =>  {
const ExportRegion: React.FC<ExportRegionTypes> = ({ children }) => {
  return (
    <div
      id='exportRegion'
      className={`
          flex max-h-[50rem] w-full max-w-3xl
          flex-col items-center justify-center
          bg-white
        `}
    >
      {children}
    </div>
  );
};
export default ExportRegion;
