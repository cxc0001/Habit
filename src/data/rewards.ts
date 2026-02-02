// 奖励系统 - 可培养项目的统一数据结构
import { Harvest } from '@/types'

export type RewardCategory = 'plant' | 'animal' | 'cooking'

export interface RewardItem {
  id: string
  name: string
  emoji: string
  category: RewardCategory
  series: string // 系列名称
  checkInsRequired: number // 需要的打卡次数
  animationClass: string
  possibleHarvests: Harvest[]
}

// =============== 植物类 ===============

// 玉米系列
const cornSeries: RewardItem[] = [
  {
    id: 'corn_1', name: '甜玉米', emoji: '🌽', category: 'plant', series: '玉米',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { name: '甜玉米', emoji: '🌽', rarity: 'common', points: 0 },
    ],
  },
  {
    id: 'corn_2', name: '糯玉米', emoji: '🌽', category: 'plant', series: '玉米',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { name: '糯玉米', emoji: '🌾', rarity: 'uncommon', points: 0 },
    ],
  },
  {
    id: 'corn_3', name: '彩虹玉米', emoji: '🌈', category: 'plant', series: '玉米',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { name: '彩虹玉米', emoji: '🌈', rarity: 'rare', points: 0 },
    ],
  },
  {
    id: 'corn_4', name: '玉米浓汤', emoji: '🍲', category: 'plant', series: '玉米',
    checkInsRequired: 15, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { name: '玉米浓汤', emoji: '🍲', rarity: 'legendary', points: 0 },
    ],
  },
]

// 向日葵系列
const sunflowerSeries: RewardItem[] = [
  {
    id: 'sunflower_1', name: '小葵花', emoji: '🌻', category: 'plant', series: '向日葵',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '小葵花', emoji: '🌻', rarity: 'common', points: 0 }],
  },
  {
    id: 'sunflower_2', name: '葵花籽', emoji: '🌻', category: 'plant', series: '向日葵',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '葵花籽', emoji: '🌰', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'sunflower_3', name: '葵花油', emoji: '🫒', category: 'plant', series: '向日葵',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '葵花油', emoji: '🫒', rarity: 'rare', points: 0 }],
  },
  {
    id: 'sunflower_4', name: '太阳精华', emoji: '☀️', category: 'plant', series: '向日葵',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '太阳精华', emoji: '☀️', rarity: 'legendary', points: 0 }],
  },
]

// 草莓系列
const strawberrySeries: RewardItem[] = [
  {
    id: 'strawberry_1', name: '小草莓', emoji: '🍓', category: 'plant', series: '草莓',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '小草莓', emoji: '🍓', rarity: 'common', points: 0 }],
  },
  {
    id: 'strawberry_2', name: '大草莓', emoji: '🍓', category: 'plant', series: '草莓',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '大草莓', emoji: '🍓', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'strawberry_3', name: '草莓酱', emoji: '🫙', category: 'plant', series: '草莓',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '草莓酱', emoji: '🫙', rarity: 'rare', points: 0 }],
  },
  {
    id: 'strawberry_4', name: '草莓蛋糕', emoji: '🍰', category: 'plant', series: '草莓',
    checkInsRequired: 15, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '草莓蛋糕', emoji: '🍰', rarity: 'legendary', points: 0 }],
  },
]

// 玫瑰系列
const roseSeries: RewardItem[] = [
  {
    id: 'rose_1', name: '玫瑰花苞', emoji: '🌹', category: 'plant', series: '玫瑰',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '玫瑰花苞', emoji: '🌹', rarity: 'common', points: 0 }],
  },
  {
    id: 'rose_2', name: '红玫瑰', emoji: '🌹', category: 'plant', series: '玫瑰',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '红玫瑰', emoji: '🌹', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'rose_3', name: '玫瑰花茶', emoji: '🍵', category: 'plant', series: '玫瑰',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '玫瑰花茶', emoji: '🍵', rarity: 'rare', points: 0 }],
  },
  {
    id: 'rose_4', name: '玫瑰精油', emoji: '💎', category: 'plant', series: '玫瑰',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '玫瑰精油', emoji: '💎', rarity: 'legendary', points: 0 }],
  },
]

// 西瓜系列
const watermelonSeries: RewardItem[] = [
  {
    id: 'watermelon_1', name: '小西瓜', emoji: '🍉', category: 'plant', series: '西瓜',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '小西瓜', emoji: '🍉', rarity: 'common', points: 0 }],
  },
  {
    id: 'watermelon_2', name: '大西瓜', emoji: '🍉', category: 'plant', series: '西瓜',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '大西瓜', emoji: '🍉', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'watermelon_3', name: '西瓜汁', emoji: '🧃', category: 'plant', series: '西瓜',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '西瓜汁', emoji: '🧃', rarity: 'rare', points: 0 }],
  },
  {
    id: 'watermelon_4', name: '西瓜冰沙', emoji: '🍧', category: 'plant', series: '西瓜',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '西瓜冰沙', emoji: '🍧', rarity: 'legendary', points: 0 }],
  },
]

// 胡萝卜系列
const carrotSeries: RewardItem[] = [
  {
    id: 'carrot_1', name: '小萝卜', emoji: '🥕', category: 'plant', series: '胡萝卜',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '小萝卜', emoji: '🥕', rarity: 'common', points: 0 }],
  },
  {
    id: 'carrot_2', name: '大萝卜', emoji: '🥕', category: 'plant', series: '胡萝卜',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '大萝卜', emoji: '🥕', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'carrot_3', name: '萝卜汤', emoji: '🍲', category: 'plant', series: '胡萝卜',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '萝卜汤', emoji: '🍲', rarity: 'rare', points: 0 }],
  },
  {
    id: 'carrot_4', name: '胡萝卜蛋糕', emoji: '🎂', category: 'plant', series: '胡萝卜',
    checkInsRequired: 15, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '胡萝卜蛋糕', emoji: '🎂', rarity: 'legendary', points: 0 }],
  },
]

// 番茄系列
const tomatoSeries: RewardItem[] = [
  {
    id: 'tomato_1', name: '小番茄', emoji: '🍅', category: 'plant', series: '番茄',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '小番茄', emoji: '🍅', rarity: 'common', points: 0 }],
  },
  {
    id: 'tomato_2', name: '大番茄', emoji: '🍅', category: 'plant', series: '番茄',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '大番茄', emoji: '🍅', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'tomato_3', name: '番茄酱', emoji: '🫙', category: 'plant', series: '番茄',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '番茄酱', emoji: '🫙', rarity: 'rare', points: 0 }],
  },
  {
    id: 'tomato_4', name: '番茄意面', emoji: '🍝', category: 'plant', series: '番茄',
    checkInsRequired: 15, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '番茄意面', emoji: '🍝', rarity: 'legendary', points: 0 }],
  },
]

// 樱桃系列
const cherrySeries: RewardItem[] = [
  {
    id: 'cherry_1', name: '青樱桃', emoji: '🍒', category: 'plant', series: '樱桃',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '青樱桃', emoji: '🍒', rarity: 'common', points: 0 }],
  },
  {
    id: 'cherry_2', name: '红樱桃', emoji: '🍒', category: 'plant', series: '樱桃',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '红樱桃', emoji: '🍒', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'cherry_3', name: '樱桃派', emoji: '🥧', category: 'plant', series: '樱桃',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '樱桃派', emoji: '🥧', rarity: 'rare', points: 0 }],
  },
  {
    id: 'cherry_4', name: '樱桃酒', emoji: '🍷', category: 'plant', series: '樱桃',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '樱桃酒', emoji: '🍷', rarity: 'legendary', points: 0 }],
  },
]

// 苹果系列
const appleSeries: RewardItem[] = [
  {
    id: 'apple_1', name: '青苹果', emoji: '🍏', category: 'plant', series: '苹果',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '青苹果', emoji: '🍏', rarity: 'common', points: 0 }],
  },
  {
    id: 'apple_2', name: '红苹果', emoji: '🍎', category: 'plant', series: '苹果',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '红苹果', emoji: '🍎', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'apple_3', name: '苹果汁', emoji: '🧃', category: 'plant', series: '苹果',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '苹果汁', emoji: '🧃', rarity: 'rare', points: 0 }],
  },
  {
    id: 'apple_4', name: '苹果派', emoji: '🥧', category: 'plant', series: '苹果',
    checkInsRequired: 15, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '苹果派', emoji: '🥧', rarity: 'legendary', points: 0 }],
  },
]

// =============== 动物类 ===============

// 小鸡系列
const chickenSeries: RewardItem[] = [
  {
    id: 'chicken_1', name: '小鸡仔', emoji: '🐤', category: 'animal', series: '小鸡',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '小鸡仔', emoji: '🐤', rarity: 'common', points: 0 }],
  },
  {
    id: 'chicken_2', name: '母鸡', emoji: '🐔', category: 'animal', series: '小鸡',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '母鸡', emoji: '🐔', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'chicken_3', name: '鸡蛋', emoji: '🥚', category: 'animal', series: '小鸡',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '鸡蛋', emoji: '🥚', rarity: 'rare', points: 0 }],
  },
  {
    id: 'chicken_4', name: '金蛋', emoji: '🥇', category: 'animal', series: '小鸡',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '金蛋', emoji: '🥇', rarity: 'legendary', points: 0 }],
  },
]

// 奶牛系列
const cowSeries: RewardItem[] = [
  {
    id: 'cow_1', name: '小牛犊', emoji: '🐄', category: 'animal', series: '奶牛',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '小牛犊', emoji: '🐄', rarity: 'common', points: 0 }],
  },
  {
    id: 'cow_2', name: '奶牛', emoji: '🐄', category: 'animal', series: '奶牛',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '奶牛', emoji: '🐄', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'cow_3', name: '牛奶', emoji: '🥛', category: 'animal', series: '奶牛',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '牛奶', emoji: '🥛', rarity: 'rare', points: 0 }],
  },
  {
    id: 'cow_4', name: '芝士', emoji: '🧀', category: 'animal', series: '奶牛',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '芝士', emoji: '🧀', rarity: 'legendary', points: 0 }],
  },
]

// 蜜蜂系列
const beeSeries: RewardItem[] = [
  {
    id: 'bee_1', name: '小蜜蜂', emoji: '🐝', category: 'animal', series: '蜜蜂',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '小蜜蜂', emoji: '🐝', rarity: 'common', points: 0 }],
  },
  {
    id: 'bee_2', name: '蜂巢', emoji: '🪹', category: 'animal', series: '蜜蜂',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '蜂巢', emoji: '🪹', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'bee_3', name: '蜂蜜', emoji: '🍯', category: 'animal', series: '蜜蜂',
    checkInsRequired: 10, animationClass: 'sparkle',
    possibleHarvests: [{ name: '蜂蜜', emoji: '🍯', rarity: 'rare', points: 0 }],
  },
  {
    id: 'bee_4', name: '蜂王浆', emoji: '👑', category: 'animal', series: '蜜蜂',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '蜂王浆', emoji: '👑', rarity: 'legendary', points: 0 }],
  },
]

// 兔子系列
const rabbitSeries: RewardItem[] = [
  {
    id: 'rabbit_1', name: '小兔子', emoji: '🐰', category: 'animal', series: '兔子',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '小兔子', emoji: '🐰', rarity: 'common', points: 0 }],
  },
  {
    id: 'rabbit_2', name: '大白兔', emoji: '🐇', category: 'animal', series: '兔子',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '大白兔', emoji: '🐇', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'rabbit_3', name: '兔毛', emoji: '☁️', category: 'animal', series: '兔子',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '兔毛', emoji: '☁️', rarity: 'rare', points: 0 }],
  },
  {
    id: 'rabbit_4', name: '幸运兔脚', emoji: '🍀', category: 'animal', series: '兔子',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '幸运兔脚', emoji: '🍀', rarity: 'legendary', points: 0 }],
  },
]

// 猪系列
const pigSeries: RewardItem[] = [
  {
    id: 'pig_1', name: '小猪仔', emoji: '🐷', category: 'animal', series: '小猪',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '小猪仔', emoji: '🐷', rarity: 'common', points: 0 }],
  },
  {
    id: 'pig_2', name: '大肥猪', emoji: '🐖', category: 'animal', series: '小猪',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '大肥猪', emoji: '🐖', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'pig_3', name: '火腿', emoji: '🍖', category: 'animal', series: '小猪',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '火腿', emoji: '🍖', rarity: 'rare', points: 0 }],
  },
  {
    id: 'pig_4', name: '金华火腿', emoji: '🥓', category: 'animal', series: '小猪',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '金华火腿', emoji: '🥓', rarity: 'legendary', points: 0 }],
  },
]

// 羊系列
const sheepSeries: RewardItem[] = [
  {
    id: 'sheep_1', name: '小绵羊', emoji: '🐑', category: 'animal', series: '绵羊',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '小绵羊', emoji: '🐑', rarity: 'common', points: 0 }],
  },
  {
    id: 'sheep_2', name: '大绵羊', emoji: '🐏', category: 'animal', series: '绵羊',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '大绵羊', emoji: '🐏', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'sheep_3', name: '羊毛', emoji: '🧶', category: 'animal', series: '绵羊',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '羊毛', emoji: '🧶', rarity: 'rare', points: 0 }],
  },
  {
    id: 'sheep_4', name: '羊毛毯', emoji: '🛏️', category: 'animal', series: '绵羊',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '羊毛毯', emoji: '🛏️', rarity: 'legendary', points: 0 }],
  },
]

// 鸭子系列
const duckSeries: RewardItem[] = [
  {
    id: 'duck_1', name: '小鸭子', emoji: '🐥', category: 'animal', series: '鸭子',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '小鸭子', emoji: '🐥', rarity: 'common', points: 0 }],
  },
  {
    id: 'duck_2', name: '大白鸭', emoji: '🦆', category: 'animal', series: '鸭子',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '大白鸭', emoji: '🦆', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'duck_3', name: '鸭蛋', emoji: '🥚', category: 'animal', series: '鸭子',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '鸭蛋', emoji: '🥚', rarity: 'rare', points: 0 }],
  },
  {
    id: 'duck_4', name: '咸鸭蛋', emoji: '🥮', category: 'animal', series: '鸭子',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '咸鸭蛋', emoji: '🥮', rarity: 'legendary', points: 0 }],
  },
]

// 鱼系列
const fishSeries: RewardItem[] = [
  {
    id: 'fish_1', name: '小鱼苗', emoji: '🐟', category: 'animal', series: '鱼',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '小鱼苗', emoji: '🐟', rarity: 'common', points: 0 }],
  },
  {
    id: 'fish_2', name: '大鲤鱼', emoji: '🐠', category: 'animal', series: '鱼',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '大鲤鱼', emoji: '🐠', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'fish_3', name: '烤鱼', emoji: '🐡', category: 'animal', series: '鱼',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '烤鱼', emoji: '🐡', rarity: 'rare', points: 0 }],
  },
  {
    id: 'fish_4', name: '锦鲤', emoji: '🎏', category: 'animal', series: '鱼',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '锦鲤', emoji: '🎏', rarity: 'legendary', points: 0 }],
  },
]

// =============== 烹饪类 ===============

// 面包系列
const breadSeries: RewardItem[] = [
  {
    id: 'bread_1', name: '面团', emoji: '🫓', category: 'cooking', series: '面包',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '面团', emoji: '🫓', rarity: 'common', points: 0 }],
  },
  {
    id: 'bread_2', name: '白面包', emoji: '🍞', category: 'cooking', series: '面包',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '白面包', emoji: '🍞', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'bread_3', name: '牛角包', emoji: '🥐', category: 'cooking', series: '面包',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '牛角包', emoji: '🥐', rarity: 'rare', points: 0 }],
  },
  {
    id: 'bread_4', name: '法棍', emoji: '🥖', category: 'cooking', series: '面包',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '法棍', emoji: '🥖', rarity: 'legendary', points: 0 }],
  },
]

// 蛋糕系列
const cakeSeries: RewardItem[] = [
  {
    id: 'cake_1', name: '小蛋糕', emoji: '🧁', category: 'cooking', series: '蛋糕',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '小蛋糕', emoji: '🧁', rarity: 'common', points: 0 }],
  },
  {
    id: 'cake_2', name: '奶油蛋糕', emoji: '🍰', category: 'cooking', series: '蛋糕',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '奶油蛋糕', emoji: '🍰', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'cake_3', name: '生日蛋糕', emoji: '🎂', category: 'cooking', series: '蛋糕',
    checkInsRequired: 10, animationClass: 'sparkle',
    possibleHarvests: [{ name: '生日蛋糕', emoji: '🎂', rarity: 'rare', points: 0 }],
  },
  {
    id: 'cake_4', name: '婚礼蛋糕', emoji: '💒', category: 'cooking', series: '蛋糕',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '婚礼蛋糕', emoji: '💒', rarity: 'legendary', points: 0 }],
  },
]

// 拉面系列
const ramenSeries: RewardItem[] = [
  {
    id: 'ramen_1', name: '面条', emoji: '🍜', category: 'cooking', series: '拉面',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '面条', emoji: '🍜', rarity: 'common', points: 0 }],
  },
  {
    id: 'ramen_2', name: '清汤面', emoji: '🍜', category: 'cooking', series: '拉面',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '清汤面', emoji: '🍜', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'ramen_3', name: '豚骨拉面', emoji: '🍥', category: 'cooking', series: '拉面',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '豚骨拉面', emoji: '🍥', rarity: 'rare', points: 0 }],
  },
  {
    id: 'ramen_4', name: '一蘭拉面', emoji: '🌟', category: 'cooking', series: '拉面',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '一蘭拉面', emoji: '🌟', rarity: 'legendary', points: 0 }],
  },
]

// 寿司系列
const sushiSeries: RewardItem[] = [
  {
    id: 'sushi_1', name: '饭团', emoji: '🍙', category: 'cooking', series: '寿司',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '饭团', emoji: '🍙', rarity: 'common', points: 0 }],
  },
  {
    id: 'sushi_2', name: '寿司卷', emoji: '🍣', category: 'cooking', series: '寿司',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '寿司卷', emoji: '🍣', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'sushi_3', name: '刺身', emoji: '🐟', category: 'cooking', series: '寿司',
    checkInsRequired: 10, animationClass: 'sparkle',
    possibleHarvests: [{ name: '刺身', emoji: '🐟', rarity: 'rare', points: 0 }],
  },
  {
    id: 'sushi_4', name: 'Omakase', emoji: '👑', category: 'cooking', series: '寿司',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: 'Omakase', emoji: '👑', rarity: 'legendary', points: 0 }],
  },
]

// 披萨系列
const pizzaSeries: RewardItem[] = [
  {
    id: 'pizza_1', name: '披萨饼底', emoji: '🫓', category: 'cooking', series: '披萨',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '披萨饼底', emoji: '🫓', rarity: 'common', points: 0 }],
  },
  {
    id: 'pizza_2', name: '玛格丽特', emoji: '🍕', category: 'cooking', series: '披萨',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '玛格丽特', emoji: '🍕', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'pizza_3', name: '海鲜披萨', emoji: '🦐', category: 'cooking', series: '披萨',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '海鲜披萨', emoji: '🦐', rarity: 'rare', points: 0 }],
  },
  {
    id: 'pizza_4', name: '松露披萨', emoji: '💎', category: 'cooking', series: '披萨',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '松露披萨', emoji: '💎', rarity: 'legendary', points: 0 }],
  },
]

// 咖啡系列
const coffeeSeries: RewardItem[] = [
  {
    id: 'coffee_1', name: '咖啡豆', emoji: '☕', category: 'cooking', series: '咖啡',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '咖啡豆', emoji: '☕', rarity: 'common', points: 0 }],
  },
  {
    id: 'coffee_2', name: '美式咖啡', emoji: '☕', category: 'cooking', series: '咖啡',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '美式咖啡', emoji: '☕', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'coffee_3', name: '拿铁', emoji: '🥛', category: 'cooking', series: '咖啡',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '拿铁', emoji: '🥛', rarity: 'rare', points: 0 }],
  },
  {
    id: 'coffee_4', name: '猫屎咖啡', emoji: '✨', category: 'cooking', series: '咖啡',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '猫屎咖啡', emoji: '✨', rarity: 'legendary', points: 0 }],
  },
]

// 茶系列
const teaSeries: RewardItem[] = [
  {
    id: 'tea_1', name: '茶叶', emoji: '🍃', category: 'cooking', series: '茶',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '茶叶', emoji: '🍃', rarity: 'common', points: 0 }],
  },
  {
    id: 'tea_2', name: '绿茶', emoji: '🍵', category: 'cooking', series: '茶',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '绿茶', emoji: '🍵', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'tea_3', name: '抹茶', emoji: '🍵', category: 'cooking', series: '茶',
    checkInsRequired: 10, animationClass: 'sparkle',
    possibleHarvests: [{ name: '抹茶', emoji: '🍵', rarity: 'rare', points: 0 }],
  },
  {
    id: 'tea_4', name: '大红袍', emoji: '🏆', category: 'cooking', series: '茶',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '大红袍', emoji: '🏆', rarity: 'legendary', points: 0 }],
  },
]

// 冰淇淋系列
const icecreamSeries: RewardItem[] = [
  {
    id: 'icecream_1', name: '冰块', emoji: '🧊', category: 'cooking', series: '冰淇淋',
    checkInsRequired: 3, animationClass: 'sparkle',
    possibleHarvests: [{ name: '冰块', emoji: '🧊', rarity: 'common', points: 0 }],
  },
  {
    id: 'icecream_2', name: '冰淇淋球', emoji: '🍨', category: 'cooking', series: '冰淇淋',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '冰淇淋球', emoji: '🍨', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'icecream_3', name: '甜筒', emoji: '🍦', category: 'cooking', series: '冰淇淋',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '甜筒', emoji: '🍦', rarity: 'rare', points: 0 }],
  },
  {
    id: 'icecream_4', name: '圣代', emoji: '🍧', category: 'cooking', series: '冰淇淋',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '圣代', emoji: '🍧', rarity: 'legendary', points: 0 }],
  },
]

// 饼干系列
const cookieSeries: RewardItem[] = [
  {
    id: 'cookie_1', name: '面团', emoji: '🫓', category: 'cooking', series: '饼干',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '面团', emoji: '🫓', rarity: 'common', points: 0 }],
  },
  {
    id: 'cookie_2', name: '原味饼干', emoji: '🍪', category: 'cooking', series: '饼干',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '原味饼干', emoji: '🍪', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'cookie_3', name: '巧克力饼干', emoji: '🍫', category: 'cooking', series: '饼干',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '巧克力饼干', emoji: '🍫', rarity: 'rare', points: 0 }],
  },
  {
    id: 'cookie_4', name: '曲奇礼盒', emoji: '🎁', category: 'cooking', series: '饼干',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '曲奇礼盒', emoji: '🎁', rarity: 'legendary', points: 0 }],
  },
]

// 棒棒糖系列
const lollipopSeries: RewardItem[] = [
  {
    id: 'lollipop_1', name: '糖浆', emoji: '🍯', category: 'cooking', series: '棒棒糖',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '糖浆', emoji: '🍯', rarity: 'common', points: 0 }],
  },
  {
    id: 'lollipop_2', name: '棒棒糖', emoji: '🍭', category: 'cooking', series: '棒棒糖',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '棒棒糖', emoji: '🍭', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'lollipop_3', name: '彩虹棒棒糖', emoji: '🌈', category: 'cooking', series: '棒棒糖',
    checkInsRequired: 10, animationClass: 'sparkle',
    possibleHarvests: [{ name: '彩虹棒棒糖', emoji: '🌈', rarity: 'rare', points: 0 }],
  },
  {
    id: 'lollipop_4', name: '魔法糖果', emoji: '✨', category: 'cooking', series: '棒棒糖',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '魔法糖果', emoji: '✨', rarity: 'legendary', points: 0 }],
  },
]

// 面条系列
const noodlesSeries: RewardItem[] = [
  {
    id: 'noodles_1', name: '面粉', emoji: '🌾', category: 'cooking', series: '面条',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '面粉', emoji: '🌾', rarity: 'common', points: 0 }],
  },
  {
    id: 'noodles_2', name: '生面条', emoji: '🍜', category: 'cooking', series: '面条',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '生面条', emoji: '🍜', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'noodles_3', name: '炸酱面', emoji: '🍜', category: 'cooking', series: '面条',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '炸酱面', emoji: '🍜', rarity: 'rare', points: 0 }],
  },
  {
    id: 'noodles_4', name: '长寿面', emoji: '🥢', category: 'cooking', series: '面条',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '长寿面', emoji: '🥢', rarity: 'legendary', points: 0 }],
  },
]

// 热狗系列
const hotdogSeries: RewardItem[] = [
  {
    id: 'hotdog_1', name: '面包', emoji: '🍞', category: 'cooking', series: '热狗',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '面包', emoji: '🍞', rarity: 'common', points: 0 }],
  },
  {
    id: 'hotdog_2', name: '香肠', emoji: '🌭', category: 'cooking', series: '热狗',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '香肠', emoji: '🌭', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'hotdog_3', name: '热狗', emoji: '🌭', category: 'cooking', series: '热狗',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '热狗', emoji: '🌭', rarity: 'rare', points: 0 }],
  },
  {
    id: 'hotdog_4', name: '豪华热狗', emoji: '👑', category: 'cooking', series: '热狗',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '豪华热狗', emoji: '👑', rarity: 'legendary', points: 0 }],
  },
]

// 牛排系列
const steakSeries: RewardItem[] = [
  {
    id: 'steak_1', name: '生肉', emoji: '🥩', category: 'cooking', series: '牛排',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '生肉', emoji: '🥩', rarity: 'common', points: 0 }],
  },
  {
    id: 'steak_2', name: '半熟牛排', emoji: '🥩', category: 'cooking', series: '牛排',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '半熟牛排', emoji: '🥩', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'steak_3', name: '全熟牛排', emoji: '🍖', category: 'cooking', series: '牛排',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '全熟牛排', emoji: '🍖', rarity: 'rare', points: 0 }],
  },
  {
    id: 'steak_4', name: '和牛牛排', emoji: '👑', category: 'cooking', series: '牛排',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '和牛牛排', emoji: '👑', rarity: 'legendary', points: 0 }],
  },
]

// 沙拉系列
const saladSeries: RewardItem[] = [
  {
    id: 'salad_1', name: '生菜', emoji: '🥬', category: 'cooking', series: '沙拉',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '生菜', emoji: '🥬', rarity: 'common', points: 0 }],
  },
  {
    id: 'salad_2', name: '蔬菜沙拉', emoji: '🥗', category: 'cooking', series: '沙拉',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '蔬菜沙拉', emoji: '🥗', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'salad_3', name: '水果沙拉', emoji: '🥣', category: 'cooking', series: '沙拉',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '水果沙拉', emoji: '🥣', rarity: 'rare', points: 0 }],
  },
  {
    id: 'salad_4', name: '凯撒沙拉', emoji: '🥗', category: 'cooking', series: '沙拉',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '凯撒沙拉', emoji: '🥗', rarity: 'legendary', points: 0 }],
  },
]

// 蛋挞系列
const eggTartSeries: RewardItem[] = [
  {
    id: 'eggTart_1', name: '蛋液', emoji: '液体', category: 'cooking', series: '蛋挞',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '蛋液', emoji: '🍳', rarity: 'common', points: 0 }],
  },
  {
    id: 'eggTart_2', name: '挞皮', emoji: '🥮', category: 'cooking', series: '蛋挞',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '挞皮', emoji: '🥮', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'eggTart_3', name: '蛋挞', emoji: '挞', category: 'cooking', series: '蛋挞',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '蛋挞', emoji: '🥮', rarity: 'rare', points: 0 }],
  },
  {
    id: 'eggTart_4', name: '葡式蛋挞', emoji: '挞', category: 'cooking', series: '蛋挞',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '葡式蛋挞', emoji: '🥮', rarity: 'legendary', points: 0 }],
  },
]

// 豆腐系列
const tofuSeries: RewardItem[] = [
  {
    id: 'tofu_1', name: '黄豆', emoji: '🌾', category: 'cooking', series: '豆腐',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '黄豆', emoji: '🌾', rarity: 'common', points: 0 }],
  },
  {
    id: 'tofu_2', name: '豆浆', emoji: '🥛', category: 'cooking', series: '豆腐',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '豆浆', emoji: '🥛', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'tofu_3', name: '嫩豆腐', emoji: '🍮', category: 'cooking', series: '豆腐',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '嫩豆腐', emoji: '🍮', rarity: 'rare', points: 0 }],
  },
  {
    id: 'tofu_4', name: '麻婆豆腐', emoji: '🌶️', category: 'cooking', series: '豆腐',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '麻婆豆腐', emoji: '🌶️', rarity: 'legendary', points: 0 }],
  },
]

// 茶具系列
const teawareSeries: RewardItem[] = [
  {
    id: 'teaware_1', name: '茶壶', emoji: '🏺', category: 'cooking', series: '茶具',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '茶壶', emoji: '🏺', rarity: 'common', points: 0 }],
  },
  {
    id: 'teaware_2', name: '茶杯', emoji: '🍵', category: 'cooking', series: '茶具',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '茶杯', emoji: '🍵', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'teaware_3', name: '茶盘', emoji: '🫖', category: 'cooking', series: '茶具',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '茶盘', emoji: '🫖', rarity: 'rare', points: 0 }],
  },
  {
    id: 'teaware_4', name: '紫砂壶', emoji: '🏺', category: 'cooking', series: '茶具',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '紫砂壶', emoji: '🏺', rarity: 'legendary', points: 0 }],
  },
]

// 花系列
const flowerSeries: RewardItem[] = [
  {
    id: 'flower_1', name: '花种', emoji: '🌱', category: 'plant', series: '花',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '花种', emoji: '🌱', rarity: 'common', points: 0 }],
  },
  {
    id: 'flower_2', name: '花苞', emoji: '🌷', category: 'plant', series: '花',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '花苞', emoji: '🌷', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'flower_3', name: '盛开', emoji: '🌸', category: 'plant', series: '花',
    checkInsRequired: 10, animationClass: 'sparkle',
    possibleHarvests: [{ name: '盛开', emoji: '🌸', rarity: 'rare', points: 0 }],
  },
  {
    id: 'flower_4', name: '花园', emoji: '🌺', category: 'plant', series: '花',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '花园', emoji: '🌺', rarity: 'legendary', points: 0 }],
  },
]

// 多肉系列
const succulentSeries: RewardItem[] = [
  {
    id: 'succulent_1', name: '多肉叶', emoji: '🌿', category: 'plant', series: '多肉',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '多肉叶', emoji: '🌿', rarity: 'common', points: 0 }],
  },
  {
    id: 'succulent_2', name: '小多肉', emoji: '🌵', category: 'plant', series: '多肉',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '小多肉', emoji: '🌵', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'succulent_3', name: '群生多肉', emoji: '🌿', category: 'plant', series: '多肉',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '群生多肉', emoji: '🌿', rarity: 'rare', points: 0 }],
  },
  {
    id: 'succulent_4', name: '多肉花园', emoji: '💐', category: 'plant', series: '多肉',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '多肉花园', emoji: '💐', rarity: 'legendary', points: 0 }],
  },
]

// 仙人掌系列
const cactusSeries: RewardItem[] = [
  {
    id: 'cactus_1', name: '仙人掌苗', emoji: '🌵', category: 'plant', series: '仙人掌',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '仙人掌苗', emoji: '🌵', rarity: 'common', points: 0 }],
  },
  {
    id: 'cactus_2', name: '开花仙人掌', emoji: '🌵', category: 'plant', series: '仙人掌',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '开花仙人掌', emoji: '🌸', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'cactus_3', name: '巨型仙人掌', emoji: '🌵', category: 'plant', series: '仙人掌',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '巨型仙人掌', emoji: '🌵', rarity: 'rare', points: 0 }],
  },
  {
    id: 'cactus_4', name: '沙漠绿洲', emoji: '🏜️', category: 'plant', series: '仙人掌',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '沙漠绿洲', emoji: '🏜️', rarity: 'legendary', points: 0 }],
  },
]

// 兔子系列 (补充之前遗漏的)
const rabbitSeriesNew: RewardItem[] = [
  {
    id: 'rabbit_new_1', name: '兔宝宝', emoji: '🐰', category: 'animal', series: '兔子',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '兔宝宝', emoji: '🐰', rarity: 'common', points: 0 }],
  },
  {
    id: 'rabbit_new_2', name: '长耳兔', emoji: '🐰', category: 'animal', series: '兔子',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '长耳兔', emoji: '🐰', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'rabbit_new_3', name: '棉花兔', emoji: '🐰', category: 'animal', series: '兔子',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '棉花兔', emoji: '🐰', rarity: 'rare', points: 0 }],
  },
  {
    id: 'rabbit_new_4', name: '月宫玉兔', emoji: '🐰', category: 'animal', series: '兔子',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '月宫玉兔', emoji: '🐰', rarity: 'legendary', points: 0 }],
  },
]

// 仓鼠系列
const hamsterSeries: RewardItem[] = [
  {
    id: 'hamster_1', name: '仓鼠球', emoji: '⚽', category: 'animal', series: '仓鼠',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '仓鼠球', emoji: '⚽', rarity: 'common', points: 0 }],
  },
  {
    id: 'hamster_2', name: '胖仓鼠', emoji: '🐹', category: 'animal', series: '仓鼠',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '胖仓鼠', emoji: '🐹', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'hamster_3', name: '金丝熊', emoji: '🐹', category: 'animal', series: '仓鼠',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '金丝熊', emoji: '🐹', rarity: 'rare', points: 0 }],
  },
  {
    id: 'hamster_4', name: '仓鼠王国', emoji: '🏰', category: 'animal', series: '仓鼠',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '仓鼠王国', emoji: '🏰', rarity: 'legendary', points: 0 }],
  },
]

// 鹦鹉系列
const parrotSeries: RewardItem[] = [
  {
    id: 'parrot_1', name: '鹦鹉蛋', emoji: '🥚', category: 'animal', series: '鹦鹉',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '鹦鹉蛋', emoji: '🥚', rarity: 'common', points: 0 }],
  },
  {
    id: 'parrot_2', name: '小鹦鹉', emoji: '🦜', category: 'animal', series: '鹦鹉',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '小鹦鹉', emoji: '🦜', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'parrot_3', name: '彩色鹦鹉', emoji: '🦜', category: 'animal', series: '鹦鹉',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '彩色鹦鹉', emoji: '🦜', rarity: 'rare', points: 0 }],
  },
  {
    id: 'parrot_4', name: '会说话的鸟', emoji: '🦜', category: 'animal', series: '鹦鹉',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '会说话的鸟', emoji: '🦜', rarity: 'legendary', points: 0 }],
  },
]

// 狐狸系列
const foxSeries: RewardItem[] = [
  {
    id: 'fox_1', name: '狐崽', emoji: '🦊', category: 'animal', series: '狐狸',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '狐崽', emoji: '🦊', rarity: 'common', points: 0 }],
  },
  {
    id: 'fox_2', name: '灵狐', emoji: '🦊', category: 'animal', series: '狐狸',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '灵狐', emoji: '🦊', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'fox_3', name: '九尾狐', emoji: '🦊', category: 'animal', series: '狐狸',
    checkInsRequired: 10, animationClass: 'sparkle',
    possibleHarvests: [{ name: '九尾狐', emoji: '🦊', rarity: 'rare', points: 0 }],
  },
  {
    id: 'fox_4', name: '仙狐', emoji: '🦊', category: 'animal', series: '狐狸',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '仙狐', emoji: '🦊', rarity: 'legendary', points: 0 }],
  },
]

// 狗系列
const dogSeries: RewardItem[] = [
  {
    id: 'dog_1', name: '狗崽', emoji: '🐶', category: 'animal', series: '狗',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '狗崽', emoji: '🐶', rarity: 'common', points: 0 }],
  },
  {
    id: 'dog_2', name: '金毛', emoji: '🐕', category: 'animal', series: '狗',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '金毛', emoji: '🐕', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'dog_3', name: '导盲犬', emoji: '🐕', category: 'animal', series: '狗',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '导盲犬', emoji: '🐕', rarity: 'rare', points: 0 }],
  },
  {
    id: 'dog_4', name: '功勋犬', emoji: '🏅', category: 'animal', series: '狗',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '功勋犬', emoji: '🏅', rarity: 'legendary', points: 0 }],
  },
]

// 猫系列
const catSeries: RewardItem[] = [
  {
    id: 'cat_1', name: '猫崽', emoji: '🐱', category: 'animal', series: '猫',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '猫崽', emoji: '🐱', rarity: 'common', points: 0 }],
  },
  {
    id: 'cat_2', name: '英短', emoji: '🐱', category: 'animal', series: '猫',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '英短', emoji: '🐱', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'cat_3', name: '布偶猫', emoji: '🐱', category: 'animal', series: '猫',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '布偶猫', emoji: '🐱', rarity: 'rare', points: 0 }],
  },
  {
    id: 'cat_4', name: '猫界帝王', emoji: '👑', category: 'animal', series: '猫',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '猫界帝王', emoji: '👑', rarity: 'legendary', points: 0 }],
  },
]

// 蝴蝶系列
const butterflySeries: RewardItem[] = [
  {
    id: 'butterfly_1', name: '蝴蝶卵', emoji: '🥚', category: 'animal', series: '蝴蝶',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '蝴蝶卵', emoji: '🥚', rarity: 'common', points: 0 }],
  },
  {
    id: 'butterfly_2', name: '毛毛虫', emoji: '🐛', category: 'animal', series: '蝴蝶',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '毛毛虫', emoji: '🐛', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'butterfly_3', name: '蝶蛹', emoji: '茧', category: 'animal', series: '蝴蝶',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '蝶蛹', emoji: '茧', rarity: 'rare', points: 0 }],
  },
  {
    id: 'butterfly_4', name: '彩蝶飞舞', emoji: '🦋', category: 'animal', series: '蝴蝶',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '彩蝶飞舞', emoji: '🦋', rarity: 'legendary', points: 0 }],
  },
]

// 蜜袋鼯系列
const gliderSeries: RewardItem[] = [
  {
    id: 'glider_1', name: '蜜袋鼯宝宝', emoji: '🦡', category: 'animal', series: '蜜袋鼯',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '蜜袋鼯宝宝', emoji: '🦡', rarity: 'common', points: 0 }],
  },
  {
    id: 'glider_2', name: '滑翔蜜袋鼯', emoji: '🦡', category: 'animal', series: '蜜袋鼯',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '滑翔蜜袋鼯', emoji: '🦡', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'glider_3', name: '森林精灵', emoji: '🌲', category: 'animal', series: '蜜袋鼯',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '森林精灵', emoji: '🌲', rarity: 'rare', points: 0 }],
  },
  {
    id: 'glider_4', name: '梦幻滑翔者', emoji: '✨', category: 'animal', series: '蜜袋鼯',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '梦幻滑翔者', emoji: '✨', rarity: 'legendary', points: 0 }],
  },
]

// 茶叶系列
const teaLeafSeries: RewardItem[] = [
  {
    id: 'tealeaf_1', name: '茶芽', emoji: '🌿', category: 'plant', series: '茶叶',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '茶芽', emoji: '🌿', rarity: 'common', points: 0 }],
  },
  {
    id: 'tealeaf_2', name: '绿茶', emoji: '🍵', category: 'plant', series: '茶叶',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '绿茶', emoji: '🍵', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'tealeaf_3', name: '乌龙茶', emoji: '🍵', category: 'plant', series: '茶叶',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '乌龙茶', emoji: '🍵', rarity: 'rare', points: 0 }],
  },
  {
    id: 'tealeaf_4', name: '普洱茶', emoji: '🏆', category: 'plant', series: '茶叶',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '普洱茶', emoji: '🏆', rarity: 'legendary', points: 0 }],
  },
]

// 竹子系列
const bambooSeries: RewardItem[] = [
  {
    id: 'bamboo_1', name: '竹笋', emoji: '🎍', category: 'plant', series: '竹子',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '竹笋', emoji: '🎍', rarity: 'common', points: 0 }],
  },
  {
    id: 'bamboo_2', name: '竹节', emoji: '🎋', category: 'plant', series: '竹子',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '竹节', emoji: '🎋', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'bamboo_3', name: '竹林', emoji: '🎍', category: 'plant', series: '竹子',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '竹林', emoji: '🎍', rarity: 'rare', points: 0 }],
  },
  {
    id: 'bamboo_4', name: '熊猫竹', emoji: '🐼', category: 'plant', series: '竹子',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '熊猫竹', emoji: '🐼', rarity: 'legendary', points: 0 }],
  },
]

// 椰子系列
const coconutSeries: RewardItem[] = [
  {
    id: 'coconut_1', name: '椰子树苗', emoji: '🌴', category: 'plant', series: '椰子',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '椰子树苗', emoji: '🌴', rarity: 'common', points: 0 }],
  },
  {
    id: 'coconut_2', name: '椰子', emoji: '🥥', category: 'plant', series: '椰子',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '椰子', emoji: '🥥', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'coconut_3', name: '椰汁', emoji: '🥤', category: 'plant', series: '椰子',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '椰汁', emoji: '🥤', rarity: 'rare', points: 0 }],
  },
  {
    id: 'coconut_4', name: '椰子蛋糕', emoji: '🍰', category: 'plant', series: '椰子',
    checkInsRequired: 15, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '椰子蛋糕', emoji: '🍰', rarity: 'legendary', points: 0 }],
  },
]

// 石榴系列
const pomegranateSeries: RewardItem[] = [
  {
    id: 'pomegranate_1', name: '石榴籽', emoji: '🫐', category: 'plant', series: '石榴',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '石榴籽', emoji: '🫐', rarity: 'common', points: 0 }],
  },
  {
    id: 'pomegranate_2', name: '石榴', emoji: '🫐', category: 'plant', series: '石榴',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [{ name: '石榴', emoji: '🫐', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'pomegranate_3', name: '石榴汁', emoji: '🧃', category: 'plant', series: '石榴',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '石榴汁', emoji: '🧃', rarity: 'rare', points: 0 }],
  },
  {
    id: 'pomegranate_4', name: '石榴酒', emoji: '🍷', category: 'plant', series: '石榴',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '石榴酒', emoji: '🍷', rarity: 'legendary', points: 0 }],
  },
]

// 猴子系列
const monkeySeries: RewardItem[] = [
  {
    id: 'monkey_1', name: '猴宝宝', emoji: '🐵', category: 'animal', series: '猴子',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '猴宝宝', emoji: '🐵', rarity: 'common', points: 0 }],
  },
  {
    id: 'monkey_2', name: '大猴子', emoji: '🐒', category: 'animal', series: '猴子',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '大猴子', emoji: '🐒', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'monkey_3', name: '香蕉', emoji: '🍌', category: 'animal', series: '猴子',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '香蕉', emoji: '🍌', rarity: 'rare', points: 0 }],
  },
  {
    id: 'monkey_4', name: '金猴奖', emoji: '🥇', category: 'animal', series: '猴子',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '金猴奖', emoji: '🥇', rarity: 'legendary', points: 0 }],
  },
]

// 企鹅系列
const penguinSeries: RewardItem[] = [
  {
    id: 'penguin_1', name: '企鹅宝宝', emoji: '🐧', category: 'animal', series: '企鹅',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '企鹅宝宝', emoji: '🐧', rarity: 'common', points: 0 }],
  },
  {
    id: 'penguin_2', name: '帝企鹅', emoji: '🐧', category: 'animal', series: '企鹅',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [{ name: '帝企鹅', emoji: '🐧', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'penguin_3', name: '企鹅蛋', emoji: '🥚', category: 'animal', series: '企鹅',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '企鹅蛋', emoji: '🥚', rarity: 'rare', points: 0 }],
  },
  {
    id: 'penguin_4', name: '冰川守护者', emoji: '❄️', category: 'animal', series: '企鹅',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '冰川守护者', emoji: '❄️', rarity: 'legendary', points: 0 }],
  },
]

// 猫头鹰系列
const owlSeries: RewardItem[] = [
  {
    id: 'owl_1', name: '猫头鹰雏', emoji: '🦉', category: 'animal', series: '猫头鹰',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '猫头鹰雏', emoji: '🦉', rarity: 'common', points: 0 }],
  },
  {
    id: 'owl_2', name: '智慧猫头鹰', emoji: '🦉', category: 'animal', series: '猫头鹰',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '智慧猫头鹰', emoji: '🦉', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'owl_3', name: '夜行专家', emoji: '🌙', category: 'animal', series: '猫头鹰',
    checkInsRequired: 10, animationClass: 'sparkle',
    possibleHarvests: [{ name: '夜行专家', emoji: '🌙', rarity: 'rare', points: 0 }],
  },
  {
    id: 'owl_4', name: '森林智者', emoji: '🦉', category: 'animal', series: '猫头鹰',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '森林智者', emoji: '🦉', rarity: 'legendary', points: 0 }],
  },
]

// 海豚系列
const dolphinSeries: RewardItem[] = [
  {
    id: 'dolphin_1', name: '海豚宝宝', emoji: '🐬', category: 'animal', series: '海豚',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '海豚宝宝', emoji: '🐬', rarity: 'common', points: 0 }],
  },
  {
    id: 'dolphin_2', name: '聪明海豚', emoji: '🐬', category: 'animal', series: '海豚',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '聪明海豚', emoji: '🐬', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'dolphin_3', name: '海洋精灵', emoji: '🌊', category: 'animal', series: '海豚',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [{ name: '海洋精灵', emoji: '🌊', rarity: 'rare', points: 0 }],
  },
  {
    id: 'dolphin_4', name: '海神使者', emoji: '🔱', category: 'animal', series: '海豚',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '海神使者', emoji: '🔱', rarity: 'legendary', points: 0 }],
  },
]

// 汉堡系列
const burgerSeries: RewardItem[] = [
  {
    id: 'burger_1', name: '面包片', emoji: '🍞', category: 'cooking', series: '汉堡',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '面包片', emoji: '🍞', rarity: 'common', points: 0 }],
  },
  {
    id: 'burger_2', name: '牛肉饼', emoji: '🥩', category: 'cooking', series: '汉堡',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '牛肉饼', emoji: '🥩', rarity: 'uncommon', points: 0 }],
  },
  {
    id: 'burger_3', name: '芝士汉堡', emoji: '🍔', category: 'cooking', series: '汉堡',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [{ name: '芝士汉堡', emoji: '🍔', rarity: 'rare', points: 0 }],
  },
  {
    id: 'burger_4', name: '和牛汉堡', emoji: '👑', category: 'cooking', series: '汉堡',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [{ name: '和牛汉堡', emoji: '👑', rarity: 'legendary', points: 0 }],
  },
]



// 所有烹饪
export const cooking: RewardItem[] = [
  ...breadSeries,
  ...cakeSeries,
  ...ramenSeries,
  ...sushiSeries,
  ...pizzaSeries,
  ...coffeeSeries,
  ...teaSeries,
  ...icecreamSeries,
  ...burgerSeries,
  ...cookieSeries,
  ...lollipopSeries,
  ...noodlesSeries,
  ...hotdogSeries,
  ...steakSeries,
  ...saladSeries,
  ...eggTartSeries,
  ...tofuSeries,
  ...teawareSeries,
]

// 所有植物
export const plants: RewardItem[] = [
  ...cornSeries,
  ...sunflowerSeries,
  ...strawberrySeries,
  ...roseSeries,
  ...watermelonSeries,
  ...carrotSeries,
  ...tomatoSeries,
  ...cherrySeries,
  ...appleSeries,
  ...teaLeafSeries,
  ...bambooSeries,
  ...coconutSeries,
  ...pomegranateSeries,
  ...flowerSeries,
  ...succulentSeries,
  ...cactusSeries,
]

// 所有动物
export const animals: RewardItem[] = [
  ...chickenSeries,
  ...cowSeries,
  ...beeSeries,
  ...rabbitSeries,
  ...pigSeries,
  ...sheepSeries,
  ...duckSeries,
  ...fishSeries,
  ...monkeySeries,
  ...penguinSeries,
  ...owlSeries,
  ...dolphinSeries,
  ...hamsterSeries,
  ...parrotSeries,
  ...foxSeries,
  ...dogSeries,
  ...catSeries,
  ...butterflySeries,
  ...gliderSeries,
]

// 所有奖励项目
export const allRewardItems: RewardItem[] = [...plants, ...animals, ...cooking]

// 按系列分组
export const seriesGroups = {
  plant: ['玉米', '向日葵', '草莓', '玫瑰', '西瓜', '胡萝卜', '番茄', '樱桃', '苹果', '茶叶', '竹子', '椰子', '石榴', '花', '多肉', '仙人掌'],
  animal: ['小鸡', '奶牛', '蜜蜂', '兔子', '小猪', '绵羊', '鸭子', '鱼', '猴子', '企鹅', '猫头鹰', '海豚', '仓鼠', '鹦鹉', '狐狸', '狗', '猫', '蝴蝶', '蜜袋鼯'],
  cooking: ['面包', '蛋糕', '拉面', '寿司', '披萨', '咖啡', '茶', '冰淇淋', '汉堡', '饼干', '棒棒糖', '面条', '热狗', '牛排', '沙拉', '蛋挞', '豆腐', '茶具'],
}

// 根据分类获取奖励项目
export function getRewardsByCategory(category: RewardCategory): RewardItem[] {
  return allRewardItems.filter(item => item.category === category)
}

// 根据系列获取奖励项目
export function getRewardsBySeries(series: string): RewardItem[] {
  return allRewardItems.filter(item => item.series === series)
}

// 根据ID获取奖励项目
export function getRewardById(id: string): RewardItem | undefined {
  return allRewardItems.find(item => item.id === id)
}

// 获取系列的第一个项目（入门项目）
export function getSeriesFirstItem(series: string): RewardItem | undefined {
  return allRewardItems.find(item => item.series === series && item.checkInsRequired === 3)
}

// 获取系列中的下一个项目
export function getNextInSeries(currentItem: RewardItem): RewardItem | undefined {
  const seriesItems = getRewardsBySeries(currentItem.series)
    .sort((a, b) => a.checkInsRequired - b.checkInsRequired)
  const currentIndex = seriesItems.findIndex(item => item.id === currentItem.id)
  return seriesItems[currentIndex + 1]
}

// 稀有度样式
export const rarityColors = {
  common: 'text-muted-foreground',
  uncommon: 'text-primary',
  rare: 'text-accent',
  legendary: 'text-secondary',
}

export const rarityBgColors = {
  common: 'bg-muted/80',
  uncommon: 'bg-primary/15',
  rare: 'bg-accent/15',
  legendary: 'bg-gradient-warm',
}

export const rarityBorderColors = {
  common: 'border-muted-foreground/30',
  uncommon: 'border-primary/40',
  rare: 'border-accent/40',
  legendary: 'border-secondary/60',
}

export const rarityLabels = {
  common: '普通',
  uncommon: '优良',
  rare: '稀有',
  legendary: '传说',
}

// 分类图标和标签
export const categoryInfo = {
  plant: { label: '种植', emoji: '🌱', color: 'text-primary' },
  animal: { label: '养殖', emoji: '🐾', color: 'text-cute-pink' },
  cooking: { label: '烹饪', emoji: '🍳', color: 'text-secondary' },
}
