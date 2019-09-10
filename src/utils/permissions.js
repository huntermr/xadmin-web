export function actionToObject (json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.log('err', e.message)
  }
  return []
}

export function convertTreeData (resources, selectable) {
  return resources.map(r => {
    return {
      title: r.resourceName + ' - ' + formatType(r.resourceType),
      key: r.resourceId,
      value: r.resourceId,
      children: r.childResources ? convertTreeData(r.childResources) : [],
      selectable: selectable
    }
  })
}

function formatType (type) {
  if (type === 'G') {
    return '(菜单组)'
  } else if (type === 'M') {
    return '(菜单)'
  } else if (type === 'O') {
    return '(按钮)'
  }
}

export function convertCheckKeys (checkedKeys, resources) {
  // 仅选中所有子节点,以便渲染
  resources.forEach(r => {
    // 如果有子节点,则取子节点数据即可,没有才取当前节点
    if (r.childResources && r.childResources.length > 0) {
      convertCheckKeys(checkedKeys, r.childResources)
    } else {
      checkedKeys.push(r.resourceId)
    }
  })
}
