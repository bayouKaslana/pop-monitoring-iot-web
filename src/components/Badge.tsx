type Props = { ok: boolean; okText: string; badText: string }

export default function Badge({ ok, okText, badText }: Props) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}
    >
      {ok ? okText : badText}
    </span>
  )
}