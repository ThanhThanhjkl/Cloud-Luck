export default function (to, from, savedPosition) {
  // Khi chuyển tab trong cùng project detail, giữ nguyên vị trí scroll
  if (from && to.path.startsWith('/project/') && from.path.startsWith('/project/')) {
    const toBase = to.path.split('/').slice(0, 3).join('/')
    const fromBase = from.path.split('/').slice(0, 3).join('/')
    if (toBase === fromBase) {
      return new Promise((resolve) => {
        // Không scroll - giữ nguyên vị trí
        resolve(false)
      })
    }
  }

  if (savedPosition) {
    return savedPosition
  }

  return { x: 0, y: 0 }
}


