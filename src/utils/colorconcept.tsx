const gradients = [
  "from-black to-gray-900",
  "from-black to-slate-900",
  "from-black to-purple-950",
  "from-black to-red-950",
  "from-black to-green-950",
  "from-black to-emerald-950",
  "from-black to-cyan-950",
  "from-black to-pink-950",
  "from-black to-sky-900",
  "from-black to-teal-900",
  "from-black to-violet-950",
  "from-black to-fuchsia-950",
  "from-black to-rose-950",
  "from-black to-blue-950",
  "from-black to-indigo-950",
  "from-black to-zinc-900",
  "from-black to-stone-900",
];

export function getRandomGradient(): string {
  return gradients[Math.floor(Math.random() * gradients.length)];
}
