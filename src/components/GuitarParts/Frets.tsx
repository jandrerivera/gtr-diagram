const Frets = ({ frets }: { frets: number }) => {
  return (
    <div
      style={{
        gridTemplateRows: `repeat(${frets}, minmax(0, 1fr))`,
      }}
      className={`
        grid-row mt-0
        grid
        h-full
        w-full
        `}
      // h-full w-full items-start
    >
      {[...Array(frets)].map((_, i) => (
        <Fretwire key={i} i={i} />
      ))}
    </div>
  )
}

const Fretwire = ({ i }: { i: number }) => {
  const opacity = i >= 1 ? 'opacity-100' : 'opacity-0'

  return (
    <div
      className={`
        ${opacity}
        h-1 w-full bg-slate-500
      `}
    />
  )
}

export default Frets
