export default function Navbar({ title }: { title: string }) {
  return (
    <div className="h-16 bg-neutral-950 border-b border-neutral-800 flex items-center px-8 text-white">
      <h1 className="font-semibold text-lg tracking-wide">{title}</h1>
    </div>
  );
}
