import { Bell, CircleUser, Menu } from 'lucide-react'

type Props = { onMenu: () => void }

export default function Header({ onMenu }: Props) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between bg-[#0b1d3f] px-4 text-white">
      <button onClick={onMenu} className="rounded p-2 hover:bg-white/10 lg:hidden" aria-label="Buka menu">
        <Menu className="h-5 w-5" />
      </button>
      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <button className="relative rounded p-2 hover:bg-white/10" aria-label="Notifikasi">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
            2
          </span>
        </button>
        <CircleUser className="h-8 w-8" />
      </div>
    </header>
  )
}