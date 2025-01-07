const gradients = [
  "from-black to-gray-900",
  "from-black to-slate-900",
  "from-black to-zinc-900",
  "from-black to-stone-900",
];

export function getRandomGradient(): string {
  return gradients[Math.floor(Math.random() * gradients.length)];
}
