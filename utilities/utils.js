export function generateID(length) {
  return [...Array(length)].map((i) => (~~(Math.random() * 36)).toString(36)).join('');
}
