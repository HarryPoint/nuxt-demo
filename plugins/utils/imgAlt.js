// 得到头像的alt
export const getOkamiAvatarAlt = ({ name = '', sex = '' }) => {
  if (sex === 0) {
    return `陪玩帅哥${name}的头像`
  } else if (sex === 1) {
    return `陪玩帅哥${name}的头像`
  } else {
    return `${name}的头像`
  }
}

// 得到技能列表图片的alt
export const getSkillImgAlt = ({
  memberName = '',
  productName = '',
  productType
}) => {
  return productType === 'online_game'
    ? `${memberName}${productName}陪玩`
    : `${memberName}${productName}`
}

// 得到大神轮播图片的alt
export const getOkamiSlideImgAlt = ({ name = '', sex = 0, num = 1 }) => {
  if (sex === 0) {
    return `陪玩妹子${name}的照片${num}`
  } else if (sex === 1) {
    return `陪玩帅哥${name}的照片${num}`
  } else {
    return `${name}的照片${num}`
  }
}

// 得到首页导航轮播的alt
export const getNavSlideImgAlt = ({ name = '', productType = '' }) => {
  if (productType === 'online_game') {
    // 游戏类
    return `${name}陪玩`
  } else {
    // 娱乐服务类
    return name
  }
}
