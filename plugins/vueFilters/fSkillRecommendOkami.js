/**
 * 将接口数据装换为SkillRecommendOkamiList组件需要的数据
 */
import Vue from 'vue'
import { getSkillImgAlt } from '@/plugins/utils/imgAlt'

export default () => {
  Vue.filter('fSkillRecommendOkamiList', function(value = []) {
    return value.map(item => ({
      id: item._id,
      avatar: item.member_avatar,
      avatarAlt: getSkillImgAlt({
        memberName: item.member_name,
        productName: item.product_name,
        productType: item.product_type
      }),
      name: item.member_name,
      age: item.age,
      level: item.level,
      price: `${item.price}${item.unit}`,
      orderTimes: item.serve_num,
      sex: item.sex,
      linkTo: `/skill/${item.alias}/${item.member_id}`,
      labelsArr: item.titles
    }))
  })
}
