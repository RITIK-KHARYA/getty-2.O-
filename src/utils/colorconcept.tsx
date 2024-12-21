const gradients = [
  "from-black to-gray-900",
  "from-black to-slate-900",
  "from-black to-indigo-950",
  "from-black to-purple-950",
  "from-black to-red-950",
  "from-black to-blue-950",
  "from-black to-green-950",
  "from-black to-emerald-950",
  "from-black to-cyan-950",
  "from-black to-rose-950",
  "from-black to-pink-950",
  "from-black to-yellow-900",
  "from-black to-amber-900",
  "from-gray-900 to-gray-800",
  "from-slate-900 to-gray-800",
  "from-indigo-950 to-blue-900",
  "from-purple-950 to-violet-900",
  "from-red-950 to-rose-900",
  "from-blue-950 to-sky-900",
  "from-green-950 to-teal-900",
];

export function getRandomGradient(): string {
  return gradients[Math.floor(Math.random() * gradients.length)];
}
