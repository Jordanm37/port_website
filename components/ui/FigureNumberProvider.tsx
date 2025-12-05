import React from "react";

const FigureNumberContext = React.createContext<{ index: number; inc: () => number } | null>(null);

export const FigureNumberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = React.useRef(0);
  const value = React.useMemo(
    () => ({ index: ref.current, inc: () => (ref.current = ref.current + 1) }),
    []
  );
  return <FigureNumberContext.Provider value={value}>{children}</FigureNumberContext.Provider>;
};

export function useFigureNumbering(): { inc: () => number } | null {
  const ctx = React.useContext(FigureNumberContext);
  return ctx ? { inc: ctx.inc } : null;
}

export default FigureNumberProvider;
