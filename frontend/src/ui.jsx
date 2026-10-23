import React, { useEffect, useRef, useState } from 'react';

export function Field({ label, name, value, onChange, error, type = 'text', children, ...rest }) {
  const id = `f-${name}`;
  return (
    <label htmlFor={id}>
      {label}
      {children ? (
        React.cloneElement(children, { id, name, value, onChange, 'aria-invalid': !!error, 'aria-describedby': error ? `${id}-err` : undefined })
      ) : (
        <input id={id} name={name} type={type} value={value} onChange={onChange} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...rest} />
      )}
      {error && <span className="err" id={`${id}-err`} role="alert">{error}</span>}
    </label>
  );
}

export const Banner = ({ kind, children }) => (children ? <div className={`banner ${kind}`} role={kind === 'error' ? 'alert' : 'status'}>{children}</div> : null);

export const Badge = ({ kind = '', children }) => <span className={`badge ${kind}`}>{children}</span>;

// Runs an async loader on mount / when deps change and exposes loading + error state.
export function useLoad(loader, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: '' });
  const seq = useRef(0);
  const reload = React.useCallback(() => {
    const mine = ++seq.current;
    setState((s) => ({ ...s, loading: true, error: '' }));
    loader()
      .then((data) => mine === seq.current && setState({ data, loading: false, error: '' }))
      .catch((e) => mine === seq.current && setState({ data: null, loading: false, error: e.message }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(() => { reload(); }, [reload]);
  return { ...state, reload };
}

export function useFlash() {
  const [msg, setMsg] = useState({ kind: '', text: '' });
  return [msg, (kind, text) => setMsg({ kind, text }), () => setMsg({ kind: '', text: '' })];
}
