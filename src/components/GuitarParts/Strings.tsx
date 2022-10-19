const Strings = ({ strings }: { strings: number }) => {
  return (
    <div
      className={`
        absolute inset-0
        -mx-1 mt-1
        flex flex-row justify-between
      `}
    >
      {[...Array(strings)].map((_, i) => (
        <String key={i} i={i} stringCount={strings} />
      ))}
    </div>
  )
}

const String = ({ i, stringCount }: { i: number; stringCount: number }) => {
  return (
    <div
      className={`
        h-full w-1 justify-self-center
        bg-slate-500
    `}
    />
  )
}

export default Strings
