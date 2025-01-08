export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <div className="bg-background-light p-6 rounded-lg shadow-md w-1/2">
        {children}
      </div>
    </div>
  )
}