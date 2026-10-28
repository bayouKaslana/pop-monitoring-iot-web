type Props = { title: string }

export default function Placeholder({ title }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-600">{title}</h1>
      <p className="mt-2 text-sm text-gray-500">Halaman ini belum dibuat.</p>
    </div>
  )
}