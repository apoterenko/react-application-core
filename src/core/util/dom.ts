export const createElement = (tag = 'div', parent = document.body): Element => {
  const el = document.createElement(tag);
  addChild(el, parent);
  return el;
};

export const addClassNameToElement = (element: Element, clsName: string): void => element.classList.add(clsName);

export const removeClassNameFromElement = (element: Element, clsName: string): void =>
  element.classList.remove(clsName);

export const addClassNameToBody = (clsName: string): void => addClassNameToElement(document.body, clsName);

export const removeClassNameFromBody = (clsName: string): void => removeClassNameFromElement(document.body, clsName);

export const addChild = (child: Element, parent: Element): Element => parent.appendChild(child);

export const addChildToBody = (child: Element): Element => addChild(child, document.body);
