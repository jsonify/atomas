import AtomGame from "@/components/atom-game"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <h1 className="text-3xl font-bold text-white mb-8">Atomas</h1>
      <AtomGame />
    </main>
  )
}

