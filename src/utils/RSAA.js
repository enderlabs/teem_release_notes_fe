
export default function makeType(action) {
  return [action, `${action}_SUCCESS`, `${action}_FAILURE`];
}
