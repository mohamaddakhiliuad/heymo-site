export default function USectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <footer className="mt-8 pb-8 text-center text-xs text-text-muted">
        Powered by <a href="https://heymo.ca" target="_blank" rel="noopener noreferrer" className="underline">heymo.ca</a>
      </footer>
    </>
  )
}
