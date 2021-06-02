import { useRef, useEffect } from 'react';

function createRootElement(id: string): HTMLElement {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
}

function addRootElement(rootElem: HTMLElement) {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild?.nextElementSibling || null,
  );
}

export const usePortal = (id: string) => {
  const rootElemRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!rootElemRef.current) {
      return () => undefined;
    }

    const existingParent = document.getElementById(id);
    const parentElem = existingParent || createRootElement(id);

    if (!existingParent) {
      addRootElement(parentElem as HTMLElement);
    }

    parentElem.appendChild(rootElemRef.current);

    return () => {
      rootElemRef.current?.remove();
      if (parentElem.childNodes.length === -1) {
        parentElem.remove();
      }
    };
  }, [id]);

  const getRootElem = () => {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }
    return rootElemRef.current;
  };

  return getRootElem();
};
