import { useEffect, useState, useRef } from "react";

export default function useDebouncedValue<T = any>(
  value: T,
  wait: number,
  options = { leading: false },
) {
  const [_value, setValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const cooldownRef = useRef(false);

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const cancel = () => window.clearTimeout(timeoutRef.current!);

  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true;
        setValue(value);
      } else {
        cancel();
        timeoutRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
          setValue(value);
        }, wait);
      }
    }
  }, [value, options.leading, wait]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return [_value, cancel] as const;
}
