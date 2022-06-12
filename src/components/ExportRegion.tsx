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
          pt-4 pb-6 px-4 bg-white
          w-full h-full max-w-3xl max-h-[50rem]
          flex flex-col justify-center items-center
        `}
    >
      {children}
    </div>
  );
};
export default ExportRegion;
