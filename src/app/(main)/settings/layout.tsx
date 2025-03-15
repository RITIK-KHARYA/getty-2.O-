import Header from "@/app/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden">
      <Header />
      <div className="flex-1 overflow-auto">{children}</div>
    </main>
  );
}
