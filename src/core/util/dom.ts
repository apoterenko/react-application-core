export const addClassNameToElement = (element: HTMLElement, clsName: string): void => element.classList.add(clsName);

export const removeClassNameFromElement = (element: HTMLElement, clsName: string): void =>
  element.classList.remove(clsName);

export const addClassNameToBody = (clsName: string): void => addClassNameToElement(document.body, clsName);

export const removeClassNameFromBody = (clsName: string): void => removeClassNameFromElement(document.body, clsName);

export const addChild = (child: HTMLElement, parent: HTMLElement): HTMLElement => parent.appendChild(child);

export const addChildToBody = (child: HTMLElement): HTMLElement => addChild(child, document.body);
