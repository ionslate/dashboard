export default function NavGroupLabel({ children }: { children: string }) {
  return (
    <span className="block p-2 my-3 text-gray-400 uppercase font-bold text-sm tracking-wider">
      {children}
    </span>
  );
}
