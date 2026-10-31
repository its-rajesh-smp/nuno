export function serializeEditor(root: HTMLElement) {
  const clone = root.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('[data-ph]').forEach((node) => node.removeAttribute('data-ph'));
  return clone.innerHTML;
}
