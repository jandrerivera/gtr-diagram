const Nut: React.FC<{}> = ({}) => {
  return (
    <div
      style={{ gridArea: 'nut' }}
      className={`
          note-overlay__nut
          pointer-events-none relative z-0
         -mx-1 -mt-1 -mb-1 rounded-t-lg bg-slate-500
      `}
    />
  )
}

export default Nut
