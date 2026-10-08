const format = (value: number) =>
  Number.isInteger(value) ? `${value}` : value.toFixed(2).replace(".", ",")

export function Price({ value }: { value: number }) {
  return <span className="price">€&nbsp;{format(value)}</span>
}
