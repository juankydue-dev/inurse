import { useMemo, useState } from 'react'
import type { CalcInput, Calculator, Values } from '../engine/types'
import { fmt } from '../engine/types'

const LEVEL_LABEL: Record<string, string> = {
  ok: 'Bajo',
  info: 'Leve',
  warn: 'Intermedio',
  danger: 'Alto',
}

function initialValues(c: Calculator): Values {
  const v: Values = {}
  for (const inp of c.inputs) {
    if (inp.type === 'boolean') v[inp.id] = 0
    else if (inp.type === 'select') v[inp.id] = inp.default ?? inp.options[0].value
  }
  return v
}

function badge(points: number): string {
  return points > 0 ? `+${fmt(points, 2)}` : fmt(points, 2)
}

function InputRow({
  input,
  value,
  onChange,
}: {
  input: CalcInput
  value: number | undefined
  onChange: (v: number | undefined) => void
}) {
  return (
    <div className="input-row">
      <div className="input-label">
        <div className="input-title">{input.label}</div>
        {input.description && <div className="input-desc">{input.description}</div>}
      </div>
      <div className="input-control">
        {input.type === 'number' && (
          <label className="number-wrap">
            <input
              type="number"
              inputMode="decimal"
              min={input.min}
              max={input.max}
              step={input.step ?? 'any'}
              value={value === undefined || Number.isNaN(value) ? '' : value}
              onChange={(e) => {
                const raw = e.target.value
                onChange(raw === '' ? undefined : Number(raw))
              }}
            />
            {input.unit && <span className="unit">{input.unit}</span>}
          </label>
        )}
        {input.type === 'boolean' && (
          <div className="segmented">
            {[0, 1].map((i) => {
              const pts = i === 0 ? 0 : input.points ?? 1
              const selected = (value ?? 0) === (i === 0 ? 0 : input.points ?? 1)
              return (
                <button
                  key={i}
                  type="button"
                  className={`seg-btn${selected ? ' selected' : ''}`}
                  onClick={() => onChange(i === 0 ? 0 : input.points ?? 1)}
                >
                  <span>{input.labels ? input.labels[i] : i === 0 ? 'No' : 'Sí'}</span>
                  {!input.noPoints && <span className="pts">{badge(pts)}</span>}
                </button>
              )
            })}
          </div>
        )}
        {input.type === 'select' &&
          (input.dropdown || input.options.length > 5 ? (
            <select
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
            >
              {input.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                  {!input.noPoints ? ` (${badge(o.value)})` : ''}
                </option>
              ))}
            </select>
          ) : (
            <div className="segmented wrap">
              {input.options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  title={o.description}
                  className={`seg-btn${value === o.value ? ' selected' : ''}`}
                  onClick={() => onChange(o.value)}
                >
                  <span>{o.label}</span>
                  {!input.noPoints && <span className="pts">{badge(o.value)}</span>}
                </button>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export function CalculatorView({ calc, onBack }: { calc: Calculator; onBack: () => void }) {
  const [values, setValues] = useState<Values>(() => initialValues(calc))

  const missing = calc.inputs.filter(
    (i) => i.type === 'number' && (values[i.id] === undefined || Number.isNaN(values[i.id]!)),
  )
  const result = useMemo(
    () => (missing.length === 0 ? calc.compute(values) : null),
    [calc, values, missing.length],
  )

  return (
    <div className="calc-view">
      <button className="back" onClick={onBack}>
        ← Volver a la lista
      </button>
      <h1>{calc.name}</h1>
      <p className="calc-desc">{calc.description}</p>
      <div className="chips">
        <span className="chip">{calc.category}</span>
        {calc.specialty.map((s) => (
          <span key={s} className="chip subtle">
            {s}
          </span>
        ))}
      </div>

      <div className="inputs">
        {calc.inputs.map((inp) => (
          <InputRow
            key={inp.id}
            input={inp}
            value={values[inp.id]}
            onChange={(v) => setValues((prev) => ({ ...prev, [inp.id]: v }))}
          />
        ))}
      </div>

      <div className="result-panel">
        {result ? (
          <>
            <div className="result-top">
              <div className="result-main">
                <div className="big">{result.main}</div>
                {result.mainUnit && <div className="unit-label">{result.mainUnit}</div>}
              </div>
              {result.secondary && (
                <div className="result-secondary">
                  <div className="big">{result.secondary}</div>
                  {result.secondaryLabel && <div className="unit-label">{result.secondaryLabel}</div>}
                </div>
              )}
            </div>
            <div className="result-interp">
              {result.level && (
                <span className={`pill ${result.level}`}>{LEVEL_LABEL[result.level]}</span>
              )}
              <span>{result.interpretation}</span>
            </div>
            {result.details && result.details.length > 0 && (
              <ul className="result-details">
                {result.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <div className="result-empty">
            Completa {missing.length > 0 ? 'los campos numéricos' : 'los datos'} para ver el
            resultado.
          </div>
        )}
      </div>

      {calc.notes && calc.notes.length > 0 && (
        <section className="extra">
          <h2>Notas</h2>
          <ul>
            {calc.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </section>
      )}
      {calc.references && calc.references.length > 0 && (
        <section className="extra">
          <h2>Referencias</h2>
          <ul>
            {calc.references.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>
      )}
      <p className="disclaimer">
        Herramienta de apoyo docente y de cálculo. No sustituye el juicio clínico ni los
        protocolos de tu centro; verifica siempre las dosis y decisiones con fuentes oficiales.
      </p>
    </div>
  )
}
