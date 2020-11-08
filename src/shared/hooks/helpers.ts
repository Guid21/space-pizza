import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export const useCastomSelector = () => {
  const [isActiv, setIsActiv] = useState(false);

  const refSelector: any = useRef();
  const refHolder: any = useRef();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (refSelector) {
        const Styled = ReactDOM.findDOMNode(refSelector.current);
        const Holder = ReactDOM.findDOMNode(refHolder.current);

        if (Holder && Holder.contains(e.target as Node)) return;
        if (!Styled || !Styled.contains(e.target as Node)) {
          setIsActiv(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    // document.addEventListener('contextmenu', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      // document.removeEventListener('contextmenu', handleClickOutside, true);
    };
  }, [refSelector, setIsActiv]);

  const handlerSelector = useCallback(() => setIsActiv((prev) => !prev), []);
  const handlerHolder = useCallback(() => setIsActiv(false), []);

  return {
    isActiv,
    refSelector,
    refHolder,
    handlerSelector,
    handlerHolder,
  };
};
