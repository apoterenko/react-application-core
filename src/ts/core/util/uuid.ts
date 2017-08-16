export function uuid() {
  let dateNow = Date.now();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const result = (dateNow + Math.random() * 16) % 16 | 0;
    dateNow = Math.floor(dateNow / 16);
    return (c == 'x' ? result : (result & 0x3 | 0x8)).toString(16);
  });
}
