export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-8">
      {children}
    </div>
  );
}
