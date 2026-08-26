import { useMemo, useState } from 'react'
import { CALCULATORS, CATEGORIES } from './calculators'
import { CalculatorView } from './components/CalculatorView'

const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const selected = CALCULATORS.find((c) => c.id === selectedId) ?? null

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return CALCULATORS
    return CALCULATORS.filter(
      (c) =>
        normalize(c.name).includes(q) ||
        normalize(c.shortName ?? '').includes(q) ||
        normalize(c.description).includes(q) ||
        normalize(c.category).includes(q),
    )
  }, [query])

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <button
            className="brand"
            onClick={() => {
              setSelectedId(null)
              setQuery('')
            }}
          >
            <span className="logo">iN</span>
            <span className="brand-text">
              <strong>iNurse</strong>
              <small>Índices y escalas clínicas</small>
            </span>
          </button>
          {!selected && (
            <input
              className="search"
              type="search"
              placeholder="Buscar escala, índice o calculadora…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
        </div>
      </header>

      <main className="main">
        {selected ? (
          <CalculatorView
            key={selected.id}
            calc={selected}
            onBack={() => setSelectedId(null)}
          />
        ) : (
          <>
            {CATEGORIES.map((cat) => {
              const items = filtered.filter((c) => c.category === cat)
              if (items.length === 0) return null
              return (
                <section key={cat} className="category">
                  <h2>{cat}</h2>
                  <div className="grid">
                    {items.map((c) => (
                      <button key={c.id} className="card" onClick={() => setSelectedId(c.id)}>
                        <div className="card-title">{c.name}</div>
                        <div className="card-desc">{c.description}</div>
                      </button>
                    ))}
                  </div>
                </section>
              )
            })}
            {filtered.length === 0 && (
              <p className="no-results">No se encontraron calculadoras para «{query}».</p>
            )}
          </>
        )}
      </main>

      <footer className="footer">
        iNurse · {CALCULATORS.length} calculadoras · Herramienta de apoyo: no sustituye el juicio
        clínico.
      </footer>
    </div>
  )
}
