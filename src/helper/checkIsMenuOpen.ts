import { MenuPathProps } from '@/routes'

export const checkIsMenuOpen = (item: MenuPathProps, pathname: string): boolean => {
  if (pathname.startsWith(item.path)) return true
  if (item.children) {
    return item.children.some((child) => checkIsMenuOpen(child, pathname))
  }
  if (item.subMenu) {
    return item.subMenu.some((sub) => checkIsMenuOpen(sub, pathname))
  }
  return false
}

export const findParentWithSubMenu = (path: string, menuRoutes: any): any => {
  for (const item of menuRoutes) {
    // Nếu path khớp với item hiện tại, trả về null vì không có submenu
    if (path.startsWith(item.path) && item.subMenu) return item

    // Kiểm tra trong submenu
    if (item.subMenu) {
      const result = findParentWithSubMenu(path, item.subMenu)
      if (result) return item // Trả về item chứa submenu
    }

    // Kiểm tra trong children
    if (item.children) {
      const result = findParentWithSubMenu(path, item.children)
      if (result) return item
    }
  }

  // Trả về null nếu không tìm thấy
  return null
}