/**
 * Invisible honeypot fields to catch bots.
 * Bots auto-fill hidden fields; real users never see them.
 * Include in any form that submits to a lead endpoint.
 */
export default function HoneypotFields({ value, onChange }) {
  return (
    <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" tabIndex={-1}>
      <label htmlFor="hp_fax">Fax</label>
      <input
        type="text"
        id="hp_fax"
        name="fax"
        value={value || ''}
        onChange={onChange}
        autoComplete="off"
        tabIndex={-1}
      />
    </div>
  );
}
