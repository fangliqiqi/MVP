
// 判断当前路由和菜单是否匹配 返回id
export function menuMatchId(route, menus) {
  let id;
  // 过滤只有id 也就是后台返回的菜单数据
  let menu = menus.filter(item => item.id);
  // 判断当前路由和菜单树是否匹配 返回当前菜单的id
  if(menu.length ==0) {
    return 
  }
  // 去除route 里面的参数 例如 /user/?id=1 会变成 /user
  let path = route.split('?')[0];
  for(const element of menu) {
    if(element.children) {
      id = menuMatchId(path, element.children);
      if(id) {
        return id;
      }
    } else {
      if(element.path == path) {
        return element.id;
      }
    }
  }
}
