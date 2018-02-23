export function addClassNameToElement(element: HTMLElement, clsName: string): void {
  element.classList.add(clsName);
}

export function removeClassNameFromElement(element: HTMLElement, clsName: string): void {
  element.classList.remove(clsName);
}

export function addClassNameToBody(clsName: string): void {
  addClassNameToElement(document.body, clsName);
}

export function removeClassNameFromBody(clsName: string): void {
  removeClassNameFromElement(document.body, clsName);
}
