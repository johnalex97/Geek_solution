import { useId } from 'react'

export default function AudienceSelector({ value, onChange, error, inputRef }) {
  const errorId = `${useId()}-audience-error`

  return (
    <fieldset aria-describedby={error ? errorId : undefined} aria-invalid={Boolean(error)}>
      <legend className="text-sm font-semibold">Tipo de atención *</legend>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {[
          ['empresa', 'Empresa'],
          ['hogar', 'Hogar'],
        ].map(([option, label], index) => (
          <label key={option} className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-black/15 bg-white px-4 has-checked:border-[#007a3f] has-checked:bg-[var(--paper)]">
            <input ref={index === 0 ? inputRef : undefined} type="radio" name="audience" value={option} checked={value === option} onChange={() => onChange(option)} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className="accent-[#007a3f]" />
            {label}
          </label>
        ))}
      </div>
      {error ? <p id={errorId} className="mt-2 text-sm text-red-700">{error}</p> : null}
    </fieldset>
  )
}
