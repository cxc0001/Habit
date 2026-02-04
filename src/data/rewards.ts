// 奖励系统 - 可培养项目的统一数据结构
import { RewardItem } from '@/types'

export type RewardCategory = 'plant' | 'animal' | 'cooking'

// =============== 植物类 ===============

// 玉米系列
const cornSeries: RewardItem[] = [
  {
    id: 'corn_1', name: '甜玉米', emoji: '🌽', category: 'plant', series: '玉米',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_corn_1', name: '甜玉米', emoji: '🌽', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_corn_1' },
    ],
  },
  {
    id: 'corn_2', name: '糯玉米', emoji: '🌽', category: 'plant', series: '玉米',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_corn_2', name: '糯玉米', emoji: '🌾', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_corn_2' },
    ],
  },
  {
    id: 'corn_3', name: '彩虹玉米', emoji: '🌈', category: 'plant', series: '玉米',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_corn_3', name: '彩虹玉米', emoji: '🌈', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_corn_3' },
    ],
  },
  {
    id: 'corn_4', name: '玉米浓汤', emoji: '🍲', category: 'plant', series: '玉米',
    checkInsRequired: 15, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_corn_4', name: '玉米浓汤', emoji: '🍲', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_corn_4' },
    ],
  },
]

// 向日葵系列
const sunflowerSeries: RewardItem[] = [
  {
    id: 'sunflower_1', name: '向日葵种子', emoji: '🌻', category: 'plant', series: '向日葵',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_sunflower_1', name: '向日葵种子', emoji: '🌰', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_sunflower_1' },
    ],
  },
  {
    id: 'sunflower_2', name: '向日葵幼苗', emoji: '🌱', category: 'plant', series: '向日葵',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_sunflower_2', name: '向日葵幼苗', emoji: '🌿', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_sunflower_2' },
    ],
  },
  {
    id: 'sunflower_3', name: '盛开向日葵', emoji: '🌻', category: 'plant', series: '向日葵',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_sunflower_3', name: '盛开向日葵', emoji: '🌻', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_sunflower_3' },
    ],
  },
  {
    id: 'sunflower_4', name: '向日葵田', emoji: '🌞', category: 'plant', series: '向日葵',
    checkInsRequired: 15, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_sunflower_4', name: '向日葵田', emoji: '🌞', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_sunflower_4' },
    ],
  },
]

// 草莓系列
const strawberrySeries: RewardItem[] = [
  {
    id: 'strawberry_1', name: '草莓苗', emoji: '🌱', category: 'plant', series: '草莓',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_strawberry_1', name: '草莓苗', emoji: '🌱', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_strawberry_1' },
    ],
  },
  {
    id: 'strawberry_2', name: '开花草莓', emoji: '🍓', category: 'plant', series: '草莓',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_strawberry_2', name: '开花草莓', emoji: '🌸', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_strawberry_2' },
    ],
  },
  {
    id: 'strawberry_3', name: '硕果累累', emoji: '🍓', category: 'plant', series: '草莓',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_strawberry_3', name: '硕果累累', emoji: '🍓', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_strawberry_3' },
    ],
  },
  {
    id: 'strawberry_4', name: '草莓园', emoji: '🍓', category: 'plant', series: '草莓',
    checkInsRequired: 15, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_strawberry_4', name: '草莓园', emoji: '🍓', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_strawberry_4' },
    ],
  },
]

// 玫瑰系列
const roseSeries: RewardItem[] = [
  {
    id: 'rose_1', name: '玫瑰花苞', emoji: '💐', category: 'plant', series: '玫瑰',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_rose_1', name: '玫瑰花苞', emoji: '💐', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_rose_1' },
    ],
  },
  {
    id: 'rose_2', name: '粉色玫瑰', emoji: '🌹', category: 'plant', series: '玫瑰',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_rose_2', name: '粉色玫瑰', emoji: '🌹', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_rose_2' },
    ],
  },
  {
    id: 'rose_3', name: '红玫瑰', emoji: '🌹', category: 'plant', series: '玫瑰',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_rose_3', name: '红玫瑰', emoji: '🌹', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_rose_3' },
    ],
  },
  {
    id: 'rose_4', name: '玫瑰花园', emoji: '🌹', category: 'plant', series: '玫瑰',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_rose_4', name: '玫瑰花园', emoji: '🌹', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_rose_4' },
    ],
  },
]

// 西瓜系列
const watermelonSeries: RewardItem[] = [
  {
    id: 'watermelon_1', name: '西瓜苗', emoji: '🌱', category: 'plant', series: '西瓜',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_watermelon_1', name: '西瓜苗', emoji: '🌱', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_watermelon_1' },
    ],
  },
  {
    id: 'watermelon_2', name: '西瓜藤', emoji: '🍈', category: 'plant', series: '西瓜',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_watermelon_2', name: '西瓜藤', emoji: '🍈', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_watermelon_2' },
    ],
  },
  {
    id: 'watermelon_3', name: '大西瓜', emoji: '🍉', category: 'plant', series: '西瓜',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_watermelon_3', name: '大西瓜', emoji: '🍉', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_watermelon_3' },
    ],
  },
  {
    id: 'watermelon_4', name: '西瓜田', emoji: '🍉', category: 'plant', series: '西瓜',
    checkInsRequired: 15, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_watermelon_4', name: '西瓜田', emoji: '🍉', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_watermelon_4' },
    ],
  },
]

// 胡萝卜系列
const carrotSeries: RewardItem[] = [
  {
    id: 'carrot_1', name: '胡萝卜苗', emoji: '🌱', category: 'plant', series: '胡萝卜',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_carrot_1', name: '胡萝卜苗', emoji: '🌱', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_carrot_1' },
    ],
  },
  {
    id: 'carrot_2', name: '胡萝卜', emoji: '🥕', category: 'plant', series: '胡萝卜',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_carrot_2', name: '胡萝卜', emoji: '🥕', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_carrot_2' },
    ],
  },
  {
    id: 'carrot_3', name: '有机胡萝卜', emoji: '🥕', category: 'plant', series: '胡萝卜',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_carrot_3', name: '有机胡萝卜', emoji: '🥕', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_carrot_3' },
    ],
  },
  {
    id: 'carrot_4', name: '胡萝卜农场', emoji: '🥕', category: 'plant', series: '胡萝卜',
    checkInsRequired: 15, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_carrot_4', name: '胡萝卜农场', emoji: '🥕', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_carrot_4' },
    ],
  },
]

// 番茄系列
const tomatoSeries: RewardItem[] = [
  {
    id: 'tomato_1', name: '番茄苗', emoji: '🌱', category: 'plant', series: '番茄',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_tomato_1', name: '番茄苗', emoji: '🌱', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_tomato_1' },
    ],
  },
  {
    id: 'tomato_2', name: '青番茄', emoji: '🍅', category: 'plant', series: '番茄',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_tomato_2', name: '青番茄', emoji: '🍅', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_tomato_2' },
    ],
  },
  {
    id: 'tomato_3', name: '红番茄', emoji: '🍅', category: 'plant', series: '番茄',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_tomato_3', name: '红番茄', emoji: '🍅', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_tomato_3' },
    ],
  },
  {
    id: 'tomato_4', name: '番茄园', emoji: '🍅', category: 'plant', series: '番茄',
    checkInsRequired: 15, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_tomato_4', name: '番茄园', emoji: '🍅', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_tomato_4' },
    ],
  },
]

// 樱桃系列
const cherrySeries: RewardItem[] = [
  {
    id: 'cherry_1', name: '樱桃苗', emoji: '🌱', category: 'plant', series: '樱桃',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_cherry_1', name: '樱桃苗', emoji: '🌱', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_cherry_1' },
    ],
  },
  {
    id: 'cherry_2', name: '樱桃树', emoji: '🍒', category: 'plant', series: '樱桃',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_cherry_2', name: '樱桃树', emoji: '🍒', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_cherry_2' },
    ],
  },
  {
    id: 'cherry_3', name: '满树樱桃', emoji: '🍒', category: 'plant', series: '樱桃',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_cherry_3', name: '满树樱桃', emoji: '🍒', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_cherry_3' },
    ],
  },
  {
    id: 'cherry_4', name: '樱桃庄园', emoji: '🍒', category: 'plant', series: '樱桃',
    checkInsRequired: 15, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_cherry_4', name: '樱桃庄园', emoji: '🍒', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_cherry_4' },
    ],
  },
]

// 苹果系列
const appleSeries: RewardItem[] = [
  {
    id: 'apple_1', name: '苹果苗', emoji: '🌱', category: 'plant', series: '苹果',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_apple_1', name: '苹果苗', emoji: '🌱', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_apple_1' },
    ],
  },
  {
    id: 'apple_2', name: '青苹果', emoji: '🍏', category: 'plant', series: '苹果',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_apple_2', name: '青苹果', emoji: '🍏', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_apple_2' },
    ],
  },
  {
    id: 'apple_3', name: '红苹果', emoji: '🍎', category: 'plant', series: '苹果',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_apple_3', name: '红苹果', emoji: '🍎', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_apple_3' },
    ],
  },
  {
    id: 'apple_4', name: '苹果园', emoji: '🍎', category: 'plant', series: '苹果',
    checkInsRequired: 15, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_apple_4', name: '苹果园', emoji: '🍎', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_apple_4' },
    ],
  },
]

// =============== 动物类 ===============

// 小鸡系列
const chickenSeries: RewardItem[] = [
  {
    id: 'chicken_1', name: '鸡蛋', emoji: '🥚', category: 'animal', series: '小鸡',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_chicken_1', name: '鸡蛋', emoji: '🥚', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_chicken_1' },
    ],
  },
  {
    id: 'chicken_2', name: '小鸡', emoji: '🐤', category: 'animal', series: '小鸡',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_chicken_2', name: '小鸡', emoji: '🐤', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_chicken_2' },
    ],
  },
  {
    id: 'chicken_3', name: '母鸡', emoji: '🐔', category: 'animal', series: '小鸡',
    checkInsRequired: 10, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_chicken_3', name: '母鸡', emoji: '🐔', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_chicken_3' },
    ],
  },
  {
    id: 'chicken_4', name: '鸡舍', emoji: '🏠', category: 'animal', series: '小鸡',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_chicken_4', name: '鸡舍', emoji: '🏠', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_chicken_4' },
    ],
  },
]

// 奶牛系列
const cowSeries: RewardItem[] = [
  {
    id: 'cow_1', name: '小牛', emoji: '🐄', category: 'animal', series: '奶牛',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_cow_1', name: '小牛', emoji: '🐄', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_cow_1' },
    ],
  },
  {
    id: 'cow_2', name: '奶牛', emoji: '🐄', category: 'animal', series: '奶牛',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_cow_2', name: '奶牛', emoji: '🐄', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_cow_2' },
    ],
  },
  {
    id: 'cow_3', name: '产奶牛', emoji: '🥛', category: 'animal', series: '奶牛',
    checkInsRequired: 10, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_cow_3', name: '产奶牛', emoji: '🥛', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_cow_3' },
    ],
  },
  {
    id: 'cow_4', name: '牧场', emoji: '🌾', category: 'animal', series: '奶牛',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_cow_4', name: '牧场', emoji: '🌾', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_cow_4' },
    ],
  },
]

// 蜜蜂系列
const beeSeries: RewardItem[] = [
  {
    id: 'bee_1', name: '蜂巢', emoji: '🪲', category: 'animal', series: '蜜蜂',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_bee_1', name: '蜂巢', emoji: '🪲', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_bee_1' },
    ],
  },
  {
    id: 'bee_2', name: '工蜂', emoji: '🐝', category: 'animal', series: '蜜蜂',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_bee_2', name: '工蜂', emoji: '🐝', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_bee_2' },
    ],
  },
  {
    id: 'bee_3', name: '蜂王', emoji: '👑', category: 'animal', series: '蜜蜂',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_bee_3', name: '蜂王', emoji: '👑', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_bee_3' },
    ],
  },
  {
    id: 'bee_4', name: '蜂蜜', emoji: '🍯', category: 'animal', series: '蜜蜂',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_bee_4', name: '蜂蜜', emoji: '🍯', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_bee_4' },
    ],
  },
]

// 兔子系列
const rabbitSeries: RewardItem[] = [
  {
    id: 'rabbit_1', name: '兔宝宝', emoji: '🐰', category: 'animal', series: '兔子',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_rabbit_1', name: '兔宝宝', emoji: '🐰', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_rabbit_1' },
    ],
  },
  {
    id: 'rabbit_2', name: '长耳兔', emoji: '🐰', category: 'animal', series: '兔子',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_rabbit_2', name: '长耳兔', emoji: '🐰', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_rabbit_2' },
    ],
  },
  {
    id: 'rabbit_3', name: '棉花兔', emoji: '🐰', category: 'animal', series: '兔子',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_rabbit_3', name: '棉花兔', emoji: '🐰', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_rabbit_3' },
    ],
  },
  {
    id: 'rabbit_4', name: '月宫玉兔', emoji: '🐰', category: 'animal', series: '兔子',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_rabbit_4', name: '月宫玉兔', emoji: '🐰', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_rabbit_4' },
    ],
  },
]

// 小猪系列
const pigSeries: RewardItem[] = [
  {
    id: 'pig_1', name: '小猪', emoji: '🐷', category: 'animal', series: '小猪',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_pig_1', name: '小猪', emoji: '🐷', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_pig_1' },
    ],
  },
  {
    id: 'pig_2', name: '大肥猪', emoji: '🐖', category: 'animal', series: '小猪',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_pig_2', name: '大肥猪', emoji: '🐖', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_pig_2' },
    ],
  },
  {
    id: 'pig_3', name: '猪圈', emoji: '🐖', category: 'animal', series: '小猪',
    checkInsRequired: 10, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_pig_3', name: '猪圈', emoji: '🐖', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_pig_3' },
    ],
  },
  {
    id: 'pig_4', name: '养猪场', emoji: '🏠', category: 'animal', series: '小猪',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_pig_4', name: '养猪场', emoji: '🏠', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_pig_4' },
    ],
  },
]

// 绵羊系列
const sheepSeries: RewardItem[] = [
  {
    id: 'sheep_1', name: '小羊', emoji: '🐑', category: 'animal', series: '绵羊',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_sheep_1', name: '小羊', emoji: '🐑', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_sheep_1' },
    ],
  },
  {
    id: 'sheep_2', name: '绵羊', emoji: '🐑', category: 'animal', series: '绵羊',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_sheep_2', name: '绵羊', emoji: '🐑', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_sheep_2' },
    ],
  },
  {
    id: 'sheep_3', name: '羊毛', emoji: '🐏', category: 'animal', series: '绵羊',
    checkInsRequired: 10, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_sheep_3', name: '羊毛', emoji: '🐏', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_sheep_3' },
    ],
  },
  {
    id: 'sheep_4', name: '牧场', emoji: '🌾', category: 'animal', series: '绵羊',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_sheep_4', name: '牧场', emoji: '🌾', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_sheep_4' },
    ],
  },
]

// 鸭子系列
const duckSeries: RewardItem[] = [
  {
    id: 'duck_1', name: '小鸭', emoji: '🦆', category: 'animal', series: '鸭子',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_duck_1', name: '小鸭', emoji: '🦆', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_duck_1' },
    ],
  },
  {
    id: 'duck_2', name: '成年鸭', emoji: '🦆', category: 'animal', series: '鸭子',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_duck_2', name: '成年鸭', emoji: '🦆', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_duck_2' },
    ],
  },
  {
    id: 'duck_3', name: '池塘', emoji: '🏊', category: 'animal', series: '鸭子',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_duck_3', name: '池塘', emoji: '🏊', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_duck_3' },
    ],
  },
  {
    id: 'duck_4', name: '水上乐园', emoji: '🌊', category: 'animal', series: '鸭子',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_duck_4', name: '水上乐园', emoji: '🌊', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_duck_4' },
    ],
  },
]

// 鱼系列
const fishSeries: RewardItem[] = [
  {
    id: 'fish_1', name: '鱼苗', emoji: '🐠', category: 'animal', series: '鱼',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_fish_1', name: '鱼苗', emoji: '🐠', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_fish_1' },
    ],
  },
  {
    id: 'fish_2', name: '小鱼', emoji: '🐟', category: 'animal', series: '鱼',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_fish_2', name: '小鱼', emoji: '🐟', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_fish_2' },
    ],
  },
  {
    id: 'fish_3', name: '大鱼', emoji: '🐡', category: 'animal', series: '鱼',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_fish_3', name: '大鱼', emoji: '🐡', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_fish_3' },
    ],
  },
  {
    id: 'fish_4', name: '水族馆', emoji: '🏛️', category: 'animal', series: '鱼',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_fish_4', name: '水族馆', emoji: '🏛️', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_fish_4' },
    ],
  },
]

// =============== 烹饪类 ===============

// 面包系列
const breadSeries: RewardItem[] = [
  {
    id: 'bread_1', name: '面粉', emoji: ' sack', category: 'cooking', series: '面包',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_bread_1', name: '面粉', emoji: ' sack', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_bread_1' },
    ],
  },
  {
    id: 'bread_2', name: '面团', emoji: '🥯', category: 'cooking', series: '面包',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_bread_2', name: '面团', emoji: '🥯', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_bread_2' },
    ],
  },
  {
    id: 'bread_3', name: '吐司', emoji: '🍞', category: 'cooking', series: '面包',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_bread_3', name: '吐司', emoji: '🍞', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_bread_3' },
    ],
  },
  {
    id: 'bread_4', name: '烘焙坊', emoji: '🏪', category: 'cooking', series: '面包',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_bread_4', name: '烘焙坊', emoji: '🏪', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_bread_4' },
    ],
  },
]

// 蛋糕系列
const cakeSeries: RewardItem[] = [
  {
    id: 'cake_1', name: '生日蛋糕', emoji: '🎂', category: 'cooking', series: '蛋糕',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_cake_1', name: '生日蛋糕', emoji: '🎂', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_cake_1' },
    ],
  },
  {
    id: 'cake_2', name: '巧克力蛋糕', emoji: '🍫', category: 'cooking', series: '蛋糕',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_cake_2', name: '巧克力蛋糕', emoji: '🍫', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_cake_2' },
    ],
  },
  {
    id: 'cake_3', name: '草莓蛋糕', emoji: '🍓', category: 'cooking', series: '蛋糕',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_cake_3', name: '草莓蛋糕', emoji: '🍓', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_cake_3' },
    ],
  },
  {
    id: 'cake_4', name: '蛋糕店', emoji: '🏪', category: 'cooking', series: '蛋糕',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_cake_4', name: '蛋糕店', emoji: '🏪', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_cake_4' },
    ],
  },
]

// 拉面系列
const ramenSeries: RewardItem[] = [
  {
    id: 'ramen_1', name: '拉面', emoji: '🍜', category: 'cooking', series: '拉面',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_ramen_1', name: '拉面', emoji: '🍜', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_ramen_1' },
    ],
  },
  {
    id: 'ramen_2', name: '豚骨拉面', emoji: '🍖', category: 'cooking', series: '拉面',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_ramen_2', name: '豚骨拉面', emoji: '🍖', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_ramen_2' },
    ],
  },
  {
    id: 'ramen_3', name: '特制拉面', emoji: '🔥', category: 'cooking', series: '拉面',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_ramen_3', name: '特制拉面', emoji: '🔥', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_ramen_3' },
    ],
  },
  {
    id: 'ramen_4', name: '拉面馆', emoji: '🏮', category: 'cooking', series: '拉面',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_ramen_4', name: '拉面馆', emoji: '🏮', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_ramen_4' },
    ],
  },
]

// 寿司系列
const sushiSeries: RewardItem[] = [
  {
    id: 'sushi_1', name: '卷寿司', emoji: '🍣', category: 'cooking', series: '寿司',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_sushi_1', name: '卷寿司', emoji: '🍣', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_sushi_1' },
    ],
  },
  {
    id: 'sushi_2', name: '握寿司', emoji: '🍱', category: 'cooking', series: '寿司',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_sushi_2', name: '握寿司', emoji: '🍱', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_sushi_2' },
    ],
  },
  {
    id: 'sushi_3', name: '刺身拼盘', emoji: '🐟', category: 'cooking', series: '寿司',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_sushi_3', name: '刺身拼盘', emoji: '🐟', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_sushi_3' },
    ],
  },
  {
    id: 'sushi_4', name: '日料店', emoji: '🏮', category: 'cooking', series: '寿司',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_sushi_4', name: '日料店', emoji: '🏮', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_sushi_4' },
    ],
  },
]

// 披萨系列
const pizzaSeries: RewardItem[] = [
  {
    id: 'pizza_1', name: '玛格丽特', emoji: '🍕', category: 'cooking', series: '披萨',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_pizza_1', name: '玛格丽特', emoji: '🍕', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_pizza_1' },
    ],
  },
  {
    id: 'pizza_2', name: '夏威夷', emoji: '🍍', category: 'cooking', series: '披萨',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_pizza_2', name: '夏威夷', emoji: '🍍', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_pizza_2' },
    ],
  },
  {
    id: 'pizza_3', name: '至尊', emoji: '👑', category: 'cooking', series: '披萨',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_pizza_3', name: '至尊', emoji: '👑', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_pizza_3' },
    ],
  },
  {
    id: 'pizza_4', name: '披萨店', emoji: '🏪', category: 'cooking', series: '披萨',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_pizza_4', name: '披萨店', emoji: '🏪', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_pizza_4' },
    ],
  },
]

// 咖啡系列
const coffeeSeries: RewardItem[] = [
  {
    id: 'coffee_1', name: '咖啡豆', emoji: '☕', category: 'cooking', series: '咖啡',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_coffee_1', name: '咖啡豆', emoji: '☕', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_coffee_1' },
    ],
  },
  {
    id: 'coffee_2', name: '美式咖啡', emoji: '☕', category: 'cooking', series: '咖啡',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_coffee_2', name: '美式咖啡', emoji: '☕', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_coffee_2' },
    ],
  },
  {
    id: 'coffee_3', name: '拿铁', emoji: '🥛', category: 'cooking', series: '咖啡',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_coffee_3', name: '拿铁', emoji: '🥛', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_coffee_3' },
    ],
  },
  {
    id: 'coffee_4', name: '咖啡厅', emoji: '🏢', category: 'cooking', series: '咖啡',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_coffee_4', name: '咖啡厅', emoji: '🏢', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_coffee_4' },
    ],
  },
]

// 茶系列
const teaSeries: RewardItem[] = [
  {
    id: 'tea_1', name: '茶包', emoji: '🍵', category: 'cooking', series: '茶',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_tea_1', name: '茶包', emoji: '🍵', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_tea_1' },
    ],
  },
  {
    id: 'tea_2', name: '绿茶', emoji: '🍵', category: 'cooking', series: '茶',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_tea_2', name: '绿茶', emoji: '🍵', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_tea_2' },
    ],
  },
  {
    id: 'tea_3', name: '乌龙茶', emoji: '🍵', category: 'cooking', series: '茶',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_tea_3', name: '乌龙茶', emoji: '🍵', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_tea_3' },
    ],
  },
  {
    id: 'tea_4', name: '茶馆', emoji: '🏮', category: 'cooking', series: '茶',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_tea_4', name: '茶馆', emoji: '🏮', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_tea_4' },
    ],
  },
]

// 冰淇淋系列
const icecreamSeries: RewardItem[] = [
  {
    id: 'icecream_1', name: '香草', emoji: '🍦', category: 'cooking', series: '冰淇淋',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_icecream_1', name: '香草', emoji: '🍦', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_icecream_1' },
    ],
  },
  {
    id: 'icecream_2', name: '草莓', emoji: '🍓', category: 'cooking', series: '冰淇淋',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_icecream_2', name: '草莓', emoji: '🍓', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_icecream_2' },
    ],
  },
  {
    id: 'icecream_3', name: '双色', emoji: '🎨', category: 'cooking', series: '冰淇淋',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_icecream_3', name: '双色', emoji: '🎨', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_icecream_3' },
    ],
  },
  {
    id: 'icecream_4', name: '冰淇淋店', emoji: '🏪', category: 'cooking', series: '冰淇淋',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_icecream_4', name: '冰淇淋店', emoji: '🏪', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_icecream_4' },
    ],
  },
]

// 饼干系列
const cookieSeries: RewardItem[] = [
  {
    id: 'cookie_1', name: '原味', emoji: '🍪', category: 'cooking', series: '饼干',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_cookie_1', name: '原味', emoji: '🍪', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_cookie_1' },
    ],
  },
  {
    id: 'cookie_2', name: '巧克力', emoji: '🍫', category: 'cooking', series: '饼干',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_cookie_2', name: '巧克力', emoji: '🍫', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_cookie_2' },
    ],
  },
  {
    id: 'cookie_3', name: '夹心', emoji: '🧁', category: 'cooking', series: '饼干',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_cookie_3', name: '夹心', emoji: '🧁', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_cookie_3' },
    ],
  },
  {
    id: 'cookie_4', name: '烘焙工坊', emoji: '🏪', category: 'cooking', series: '饼干',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_cookie_4', name: '烘焙工坊', emoji: '🏪', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_cookie_4' },
    ],
  },
]

// 棒棒糖系列
const lollipopSeries: RewardItem[] = [
  {
    id: 'lollipop_1', name: '水果味', emoji: '🍭', category: 'cooking', series: '棒棒糖',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_lollipop_1', name: '水果味', emoji: '🍭', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_lollipop_1' },
    ],
  },
  {
    id: 'lollipop_2', name: '双色', emoji: '🎨', category: 'cooking', series: '棒棒糖',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_lollipop_2', name: '双色', emoji: '🎨', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_lollipop_2' },
    ],
  },
  {
    id: 'lollipop_3', name: '螺旋', emoji: '🌀', category: 'cooking', series: '棒棒糖',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_lollipop_3', name: '螺旋', emoji: '🌀', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_lollipop_3' },
    ],
  },
  {
    id: 'lollipop_4', name: '糖果店', emoji: '🏪', category: 'cooking', series: '棒棒糖',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_lollipop_4', name: '糖果店', emoji: '🏪', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_lollipop_4' },
    ],
  },
]

// 面条系列
const noodlesSeries: RewardItem[] = [
  {
    id: 'noodles_1', name: '挂面', emoji: '🍜', category: 'cooking', series: '面条',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_noodles_1', name: '挂面', emoji: '🍜', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_noodles_1' },
    ],
  },
  {
    id: 'noodles_2', name: '手擀面', emoji: '🍝', category: 'cooking', series: '面条',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_noodles_2', name: '手擀面', emoji: '🍝', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_noodles_2' },
    ],
  },
  {
    id: 'noodles_3', name: '刀削面', emoji: '🍜', category: 'cooking', series: '面条',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_noodles_3', name: '刀削面', emoji: '🍜', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_noodles_3' },
    ],
  },
  {
    id: 'noodles_4', name: '面馆', emoji: '🏮', category: 'cooking', series: '面条',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_noodles_4', name: '面馆', emoji: '🏮', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_noodles_4' },
    ],
  },
]

// 热狗系列
const hotdogSeries: RewardItem[] = [
  {
    id: 'hotdog_1', name: '经典热狗', emoji: '🌭', category: 'cooking', series: '热狗',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_hotdog_1', name: '经典热狗', emoji: '🌭', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_hotdog_1' },
    ],
  },
  {
    id: 'hotdog_2', name: '芝士热狗', emoji: '🧀', category: 'cooking', series: '热狗',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_hotdog_2', name: '芝士热狗', emoji: '🧀', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_hotdog_2' },
    ],
  },
  {
    id: 'hotdog_3', name: '豪华热狗', emoji: '👑', category: 'cooking', series: '热狗',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_hotdog_3', name: '豪华热狗', emoji: '👑', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_hotdog_3' },
    ],
  },
  {
    id: 'hotdog_4', name: '热狗摊', emoji: '🏪', category: 'cooking', series: '热狗',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_hotdog_4', name: '热狗摊', emoji: '🏪', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_hotdog_4' },
    ],
  },
]

// 牛排系列
const steakSeries: RewardItem[] = [
  {
    id: 'steak_1', name: '三分熟', emoji: '🥩', category: 'cooking', series: '牛排',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_steak_1', name: '三分熟', emoji: '🥩', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_steak_1' },
    ],
  },
  {
    id: 'steak_2', name: '五分熟', emoji: '🥩', category: 'cooking', series: '牛排',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_steak_2', name: '五分熟', emoji: '🥩', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_steak_2' },
    ],
  },
  {
    id: 'steak_3', name: '全熟', emoji: '🥩', category: 'cooking', series: '牛排',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_steak_3', name: '全熟', emoji: '🥩', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_steak_3' },
    ],
  },
  {
    id: 'steak_4', name: '牛排馆', emoji: '🏢', category: 'cooking', series: '牛排',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_steak_4', name: '牛排馆', emoji: '🏢', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_steak_4' },
    ],
  },
]

// 沙拉系列
const saladSeries: RewardItem[] = [
  {
    id: 'salad_1', name: '蔬菜沙拉', emoji: '🥗', category: 'cooking', series: '沙拉',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_salad_1', name: '蔬菜沙拉', emoji: '🥗', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_salad_1' },
    ],
  },
  {
    id: 'salad_2', name: '水果沙拉', emoji: '🍓', category: 'cooking', series: '沙拉',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_salad_2', name: '水果沙拉', emoji: '🍓', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_salad_2' },
    ],
  },
  {
    id: 'salad_3', name: '凯撒沙拉', emoji: '🥬', category: 'cooking', series: '沙拉',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_salad_3', name: '凯撒沙拉', emoji: '🥬', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_salad_3' },
    ],
  },
  {
    id: 'salad_4', name: '健康餐厅', emoji: '🏪', category: 'cooking', series: '沙拉',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_salad_4', name: '健康餐厅', emoji: '🏪', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_salad_4' },
    ],
  },
]

// 蛋挞系列
const eggTartSeries: RewardItem[] = [
  {
    id: 'egg_tart_1', name: '葡式蛋挞', emoji: '🥧', category: 'cooking', series: '蛋挞',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_egg_tart_1', name: '葡式蛋挞', emoji: '🥧', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_egg_tart_1' },
    ],
  },
  {
    id: 'egg_tart_2', name: '酥皮蛋挞', emoji: '🥧', category: 'cooking', series: '蛋挞',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_egg_tart_2', name: '酥皮蛋挞', emoji: ' PIE', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_egg_tart_2' },
    ],
  },
  {
    id: 'egg_tart_3', name: '迷你蛋挞', emoji: '🧁', category: 'cooking', series: '蛋挞',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_egg_tart_3', name: '迷你蛋挞', emoji: '🧁', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_egg_tart_3' },
    ],
  },
  {
    id: 'egg_tart_4', name: '蛋挞专卖店', emoji: '🏪', category: 'cooking', series: '蛋挞',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_egg_tart_4', name: '蛋挞专卖店', emoji: '🏪', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_egg_tart_4' },
    ],
  },
]

// 豆腐系列
const tofuSeries: RewardItem[] = [
  {
    id: 'tofu_1', name: '嫩豆腐', emoji: '🍮', category: 'cooking', series: '豆腐',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_tofu_1', name: '嫩豆腐', emoji: '🍮', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_tofu_1' },
    ],
  },
  {
    id: 'tofu_2', name: '老豆腐', emoji: '🍽️', category: 'cooking', series: '豆腐',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_tofu_2', name: '老豆腐', emoji: '🍽️', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_tofu_2' },
    ],
  },
  {
    id: 'tofu_3', name: '麻婆豆腐', emoji: '🌶️', category: 'cooking', series: '豆腐',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_tofu_3', name: '麻婆豆腐', emoji: '🌶️', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_tofu_3' },
    ],
  },
  {
    id: 'tofu_4', name: '豆腐坊', emoji: '🏪', category: 'cooking', series: '豆腐',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_tofu_4', name: '豆腐坊', emoji: '🏪', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_tofu_4' },
    ],
  },
]

// 茶具系列
const teawareSeries: RewardItem[] = [
  {
    id: 'teaware_1', name: '紫砂壶', emoji: '🏺', category: 'cooking', series: '茶具',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_teaware_1', name: '紫砂壶', emoji: '🏺', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_teaware_1' },
    ],
  },
  {
    id: 'teaware_2', name: '白瓷杯', emoji: '🍵', category: 'cooking', series: '茶具',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_teaware_2', name: '白瓷杯', emoji: '🍵', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_teaware_2' },
    ],
  },
  {
    id: 'teaware_3', name: '功夫茶具', emoji: '🍶', category: 'cooking', series: '茶具',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_teaware_3', name: '功夫茶具', emoji: '🍶', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_teaware_3' },
    ],
  },
  {
    id: 'teaware_4', name: '茶艺馆', emoji: '🏮', category: 'cooking', series: '茶具',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_teaware_4', name: '茶艺馆', emoji: '🏮', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_teaware_4' },
    ],
  },
]

// 花系列
const flowerSeries: RewardItem[] = [
  {
    id: 'flower_1', name: '郁金香', emoji: '🌷', category: 'plant', series: '花',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_flower_1', name: '郁金香', emoji: '🌷', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_flower_1' },
    ],
  },
  {
    id: 'flower_2', name: '百合', emoji: '💐', category: 'plant', series: '花',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_flower_2', name: '百合', emoji: '💐', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_flower_2' },
    ],
  },
  {
    id: 'flower_3', name: '薰衣草', emoji: '💜', category: 'plant', series: '花',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_flower_3', name: '薰衣草', emoji: '💜', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_flower_3' },
    ],
  },
  {
    id: 'flower_4', name: '花园', emoji: '🌺', category: 'plant', series: '花',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_flower_4', name: '花园', emoji: '🌺', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_flower_4' },
    ],
  },
]

// 多肉系列
const succulentSeries: RewardItem[] = [
  {
    id: 'succulent_1', name: '石莲花', emoji: '🪴', category: 'plant', series: '多肉',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_succulent_1', name: '石莲花', emoji: '🪴', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_succulent_1' },
    ],
  },
  {
    id: 'succulent_2', name: '熊童子', emoji: '🐾', category: 'plant', series: '多肉',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_succulent_2', name: '熊童子', emoji: '🐾', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_succulent_2' },
    ],
  },
  {
    id: 'succulent_3', name: '生石花', emoji: '🪨', category: 'plant', series: '多肉',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_succulent_3', name: '生石花', emoji: '🪨', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_succulent_3' },
    ],
  },
  {
    id: 'succulent_4', name: '多肉花园', emoji: '🌿', category: 'plant', series: '多肉',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_succulent_4', name: '多肉花园', emoji: '🌿', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_succulent_4' },
    ],
  },
]

// 仙人掌系列
const cactusSeries: RewardItem[] = [
  {
    id: 'cactus_1', name: '仙人掌苗', emoji: '🌵', category: 'plant', series: '仙人掌',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_cactus_1', name: '仙人掌苗', emoji: '🌵', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_cactus_1' },
    ],
  },
  {
    id: 'cactus_2', name: '开花仙人掌', emoji: '🌵', category: 'plant', series: '仙人掌',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_cactus_2', name: '开花仙人掌', emoji: '🌸', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_cactus_2' },
    ],
  },
  {
    id: 'cactus_3', name: '巨型仙人掌', emoji: '🌵', category: 'plant', series: '仙人掌',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_cactus_3', name: '巨型仙人掌', emoji: '🌵', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_cactus_3' },
    ],
  },
  {
    id: 'cactus_4', name: '沙漠绿洲', emoji: '🏜️', category: 'plant', series: '仙人掌',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_cactus_4', name: '沙漠绿洲', emoji: '🏜️', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_cactus_4' },
    ],
  },
]

// 仓鼠系列
const hamsterSeries: RewardItem[] = [
  {
    id: 'hamster_1', name: '仓鼠球', emoji: '⚽', category: 'animal', series: '仓鼠',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_hamster_1', name: '仓鼠球', emoji: '⚽', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_hamster_1' },
    ],
  },
  {
    id: 'hamster_2', name: '胖仓鼠', emoji: '🐹', category: 'animal', series: '仓鼠',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_hamster_2', name: '胖仓鼠', emoji: '🐹', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_hamster_2' },
    ],
  },
  {
    id: 'hamster_3', name: '金丝熊', emoji: '🐹', category: 'animal', series: '仓鼠',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_hamster_3', name: '金丝熊', emoji: '🐹', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_hamster_3' },
    ],
  },
  {
    id: 'hamster_4', name: '仓鼠王国', emoji: '🏰', category: 'animal', series: '仓鼠',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_hamster_4', name: '仓鼠王国', emoji: '🏰', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_hamster_4' },
    ],
  },
]

// 鹦鹉系列
const parrotSeries: RewardItem[] = [
  {
    id: 'parrot_1', name: '鹦鹉蛋', emoji: '🥚', category: 'animal', series: '鹦鹉',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_parrot_1', name: '鹦鹉蛋', emoji: '🥚', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_parrot_1' },
    ],
  },
  {
    id: 'parrot_2', name: '小鹦鹉', emoji: '🦜', category: 'animal', series: '鹦鹉',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_parrot_2', name: '小鹦鹉', emoji: '🦜', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_parrot_2' },
    ],
  },
  {
    id: 'parrot_3', name: '彩色鹦鹉', emoji: '🦜', category: 'animal', series: '鹦鹉',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_parrot_3', name: '彩色鹦鹉', emoji: '🦜', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_parrot_3' },
    ],
  },
  {
    id: 'parrot_4', name: '会说话的鸟', emoji: '🦜', category: 'animal', series: '鹦鹉',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_parrot_4', name: '会说话的鸟', emoji: '🦜', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_parrot_4' },
    ],
  },
]

// 狐狸系列
const foxSeries: RewardItem[] = [
  {
    id: 'fox_1', name: '狐崽', emoji: '🦊', category: 'animal', series: '狐狸',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_fox_1', name: '狐崽', emoji: '🦊', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_fox_1' },
    ],
  },
  {
    id: 'fox_2', name: '灵狐', emoji: '🦊', category: 'animal', series: '狐狸',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_fox_2', name: '灵狐', emoji: '🦊', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_fox_2' },
    ],
  },
  {
    id: 'fox_3', name: '九尾狐', emoji: '🦊', category: 'animal', series: '狐狸',
    checkInsRequired: 10, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_fox_3', name: '九尾狐', emoji: '🦊', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_fox_3' },
    ],
  },
  {
    id: 'fox_4', name: '仙狐', emoji: '🦊', category: 'animal', series: '狐狸',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_fox_4', name: '仙狐', emoji: '🦊', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_fox_4' },
    ],
  },
]

// 狗系列
const dogSeries: RewardItem[] = [
  {
    id: 'dog_1', name: '狗崽', emoji: '🐶', category: 'animal', series: '狗',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_dog_1', name: '狗崽', emoji: '🐶', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_dog_1' },
    ],
  },
  {
    id: 'dog_2', name: '金毛', emoji: '🐕', category: 'animal', series: '狗',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_dog_2', name: '金毛', emoji: '🐕', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_dog_2' },
    ],
  },
  {
    id: 'dog_3', name: '导盲犬', emoji: '🐕', category: 'animal', series: '狗',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_dog_3', name: '导盲犬', emoji: '🐕', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_dog_3' },
    ],
  },
  {
    id: 'dog_4', name: '功勋犬', emoji: '🏅', category: 'animal', series: '狗',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_dog_4', name: '功勋犬', emoji: '🏅', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_dog_4' },
    ],
  },
]

// 猫系列
const catSeries: RewardItem[] = [
  {
    id: 'cat_1', name: '猫崽', emoji: '🐱', category: 'animal', series: '猫',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_cat_1', name: '猫崽', emoji: '🐱', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_cat_1' },
    ],
  },
  {
    id: 'cat_2', name: '英短', emoji: '🐱', category: 'animal', series: '猫',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_cat_2', name: '英短', emoji: '🐱', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_cat_2' },
    ],
  },
  {
    id: 'cat_3', name: '布偶猫', emoji: '🐱', category: 'animal', series: '猫',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_cat_3', name: '布偶猫', emoji: '🐱', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_cat_3' },
    ],
  },
  {
    id: 'cat_4', name: '猫界帝王', emoji: '👑', category: 'animal', series: '猫',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_cat_4', name: '猫界帝王', emoji: '👑', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_cat_4' },
    ],
  },
]

// 蝴蝶系列
const butterflySeries: RewardItem[] = [
  {
    id: 'butterfly_1', name: '蝴蝶卵', emoji: '🥚', category: 'animal', series: '蝴蝶',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_butterfly_1', name: '蝴蝶卵', emoji: '🥚', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_butterfly_1' },
    ],
  },
  {
    id: 'butterfly_2', name: '毛毛虫', emoji: '🐛', category: 'animal', series: '蝴蝶',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_butterfly_2', name: '毛毛虫', emoji: '🐛', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_butterfly_2' },
    ],
  },
  {
    id: 'butterfly_3', name: '蝶蛹', emoji: '茧', category: 'animal', series: '蝴蝶',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_butterfly_3', name: '蝶蛹', emoji: '茧', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_butterfly_3' },
    ],
  },
  {
    id: 'butterfly_4', name: '彩蝶飞舞', emoji: '🦋', category: 'animal', series: '蝴蝶',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_butterfly_4', name: '彩蝶飞舞', emoji: '🦋', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_butterfly_4' },
    ],
  },
]

// 蜜袋鼯系列
const gliderSeries: RewardItem[] = [
  {
    id: 'glider_1', name: '蜜袋鼯宝宝', emoji: '🦡', category: 'animal', series: '蜜袋鼯',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_glider_1', name: '蜜袋鼯宝宝', emoji: '🦡', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_glider_1' },
    ],
  },
  {
    id: 'glider_2', name: '滑翔蜜袋鼯', emoji: '🦡', category: 'animal', series: '蜜袋鼯',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_glider_2', name: '滑翔蜜袋鼯', emoji: '🦡', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_glider_2' },
    ],
  },
  {
    id: 'glider_3', name: '森林精灵', emoji: '🌲', category: 'animal', series: '蜜袋鼯',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_glider_3', name: '森林精灵', emoji: '🌲', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_glider_3' },
    ],
  },
  {
    id: 'glider_4', name: '梦幻滑翔者', emoji: '✨', category: 'animal', series: '蜜袋鼯',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_glider_4', name: '梦幻滑翔者', emoji: '✨', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_glider_4' },
    ],
  },
]

// 茶叶系列
const teaLeafSeries: RewardItem[] = [
  {
    id: 'tealeaf_1', name: '茶芽', emoji: '🌿', category: 'plant', series: '茶叶',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_tealeaf_1', name: '茶芽', emoji: '🌿', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_tealeaf_1' },
    ],
  },
  {
    id: 'tealeaf_2', name: '绿茶', emoji: '🍵', category: 'plant', series: '茶叶',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_tealeaf_2', name: '绿茶', emoji: '🍵', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_tealeaf_2' },
    ],
  },
  {
    id: 'tealeaf_3', name: '乌龙茶', emoji: '🍵', category: 'plant', series: '茶叶',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_tealeaf_3', name: '乌龙茶', emoji: '🍵', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_tealeaf_3' },
    ],
  },
  {
    id: 'tealeaf_4', name: '普洱茶', emoji: '🏆', category: 'plant', series: '茶叶',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_tealeaf_4', name: '普洱茶', emoji: '🏆', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_tealeaf_4' },
    ],
  },
]

// 竹子系列
const bambooSeries: RewardItem[] = [
  {
    id: 'bamboo_1', name: '竹笋', emoji: '🎍', category: 'plant', series: '竹子',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_bamboo_1', name: '竹笋', emoji: '🎍', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_bamboo_1' },
    ],
  },
  {
    id: 'bamboo_2', name: '竹节', emoji: '🎋', category: 'plant', series: '竹子',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_bamboo_2', name: '竹节', emoji: '🎋', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_bamboo_2' },
    ],
  },
  {
    id: 'bamboo_3', name: '竹林', emoji: '🎍', category: 'plant', series: '竹子',
    checkInsRequired: 10, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_bamboo_3', name: '竹林', emoji: '🎍', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_bamboo_3' },
    ],
  },
  {
    id: 'bamboo_4', name: '熊猫竹', emoji: '🐼', category: 'plant', series: '竹子',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_bamboo_4', name: '熊猫竹', emoji: '🐼', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_bamboo_4' },
    ],
  },
]

// 椰子系列
const coconutSeries: RewardItem[] = [
  {
    id: 'coconut_1', name: '椰子树苗', emoji: '🌴', category: 'plant', series: '椰子',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_coconut_1', name: '椰子树苗', emoji: '🌴', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_coconut_1' },
    ],
  },
  {
    id: 'coconut_2', name: '椰子', emoji: '🥥', category: 'plant', series: '椰子',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_coconut_2', name: '椰子', emoji: '🥥', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_coconut_2' },
    ],
  },
  {
    id: 'coconut_3', name: '椰汁', emoji: '🥤', category: 'plant', series: '椰子',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_coconut_3', name: '椰汁', emoji: '🥤', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_coconut_3' },
    ],
  },
  {
    id: 'coconut_4', name: '椰子蛋糕', emoji: '🍰', category: 'plant', series: '椰子',
    checkInsRequired: 15, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_coconut_4', name: '椰子蛋糕', emoji: '🍰', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_coconut_4' },
    ],
  },
]

// 石榴系列
const pomegranateSeries: RewardItem[] = [
  {
    id: 'pomegranate_1', name: '石榴籽', emoji: '🫐', category: 'plant', series: '石榴',
    checkInsRequired: 3, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_pomegranate_1', name: '石榴籽', emoji: '🫐', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_pomegranate_1' },
    ],
  },
  {
    id: 'pomegranate_2', name: '石榴', emoji: '🫐', category: 'plant', series: '石榴',
    checkInsRequired: 5, animationClass: 'plant-sway',
    possibleHarvests: [
      { id: 'harvest_pomegranate_2', name: '石榴', emoji: '🫐', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_pomegranate_2' },
    ],
  },
  {
    id: 'pomegranate_3', name: '石榴汁', emoji: '🧃', category: 'plant', series: '石榴',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_pomegranate_3', name: '石榴汁', emoji: '🧃', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_pomegranate_3' },
    ],
  },
  {
    id: 'pomegranate_4', name: '石榴酒', emoji: '🍷', category: 'plant', series: '石榴',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_pomegranate_4', name: '石榴酒', emoji: '🍷', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_pomegranate_4' },
    ],
  },
]

// 猴子系列
const monkeySeries: RewardItem[] = [
  {
    id: 'monkey_1', name: '猴宝宝', emoji: '🐵', category: 'animal', series: '猴子',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_monkey_1', name: '猴宝宝', emoji: '🐵', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_monkey_1' },
    ],
  },
  {
    id: 'monkey_2', name: '大猴子', emoji: '🐒', category: 'animal', series: '猴子',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_monkey_2', name: '大猴子', emoji: '🐒', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_monkey_2' },
    ],
  },
  {
    id: 'monkey_3', name: '香蕉', emoji: '🍌', category: 'animal', series: '猴子',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_monkey_3', name: '香蕉', emoji: '🍌', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_monkey_3' },
    ],
  },
  {
    id: 'monkey_4', name: '金猴奖', emoji: '🥇', category: 'animal', series: '猴子',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_monkey_4', name: '金猴奖', emoji: '🥇', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_monkey_4' },
    ],
  },
]

// 企鹅系列
const penguinSeries: RewardItem[] = [
  {
    id: 'penguin_1', name: '企鹅宝宝', emoji: '🐧', category: 'animal', series: '企鹅',
    checkInsRequired: 3, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_penguin_1', name: '企鹅宝宝', emoji: '🐧', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_penguin_1' },
    ],
  },
  {
    id: 'penguin_2', name: '帝企鹅', emoji: '🐧', category: 'animal', series: '企鹅',
    checkInsRequired: 5, animationClass: 'chicken-walk',
    possibleHarvests: [
      { id: 'harvest_penguin_2', name: '帝企鹅', emoji: '🐧', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_penguin_2' },
    ],
  },
  {
    id: 'penguin_3', name: '企鹅蛋', emoji: '🥚', category: 'animal', series: '企鹅',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_penguin_3', name: '企鹅蛋', emoji: '🥚', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_penguin_3' },
    ],
  },
  {
    id: 'penguin_4', name: '冰川守护者', emoji: '❄️', category: 'animal', series: '企鹅',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_penguin_4', name: '冰川守护者', emoji: '❄️', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_penguin_4' },
    ],
  },
]

// 猫头鹰系列
const owlSeries: RewardItem[] = [
  {
    id: 'owl_1', name: '猫头鹰雏', emoji: '🦉', category: 'animal', series: '猫头鹰',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_owl_1', name: '猫头鹰雏', emoji: '🦉', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_owl_1' },
    ],
  },
  {
    id: 'owl_2', name: '智慧猫头鹰', emoji: '🦉', category: 'animal', series: '猫头鹰',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_owl_2', name: '智慧猫头鹰', emoji: '/owl', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_owl_2' },
    ],
  },
  {
    id: 'owl_3', name: '夜行专家', emoji: '🌙', category: 'animal', series: '猫头鹰',
    checkInsRequired: 10, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_owl_3', name: '夜行专家', emoji: '🌙', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_owl_3' },
    ],
  },
  {
    id: 'owl_4', name: '森林智者', emoji: '🦉', category: 'animal', series: '猫头鹰',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_owl_4', name: '森林智者', emoji: '🦉', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_owl_4' },
    ],
  },
]

// 海豚系列
const dolphinSeries: RewardItem[] = [
  {
    id: 'dolphin_1', name: '海豚宝宝', emoji: '🐬', category: 'animal', series: '海豚',
    checkInsRequired: 3, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_dolphin_1', name: '海豚宝宝', emoji: '🐬', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_dolphin_1' },
    ],
  },
  {
    id: 'dolphin_2', name: '聪明海豚', emoji: '🐬', category: 'animal', series: '海豚',
    checkInsRequired: 5, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_dolphin_2', name: '聪明海豚', emoji: '🐬', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_dolphin_2' },
    ],
  },
  {
    id: 'dolphin_3', name: '海洋精灵', emoji: '🌊', category: 'animal', series: '海豚',
    checkInsRequired: 10, animationClass: 'float-gentle',
    possibleHarvests: [
      { id: 'harvest_dolphin_3', name: '海洋精灵', emoji: '🌊', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_dolphin_3' },
    ],
  },
  {
    id: 'dolphin_4', name: '海神使者', emoji: ' Trident', category: 'animal', series: '海豚',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_dolphin_4', name: '海神使者', emoji: ' Trident', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_dolphin_4' },
    ],
  },
]

// 汉堡系列
const burgerSeries: RewardItem[] = [
  {
    id: 'burger_1', name: '面包片', emoji: '🍞', category: 'cooking', series: '汉堡',
    checkInsRequired: 3, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_burger_1', name: '面包片', emoji: '🍞', rarity: 'common', points: 0, obtainedAt: '', projectId: 'project_burger_1' },
    ],
  },
  {
    id: 'burger_2', name: '牛肉饼', emoji: '🥩', category: 'cooking', series: '汉堡',
    checkInsRequired: 5, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_burger_2', name: '牛肉饼', emoji: '🥩', rarity: 'uncommon', points: 0, obtainedAt: '', projectId: 'project_burger_2' },
    ],
  },
  {
    id: 'burger_3', name: '芝士汉堡', emoji: '🍔', category: 'cooking', series: '汉堡',
    checkInsRequired: 10, animationClass: 'cooking-bubble',
    possibleHarvests: [
      { id: 'harvest_burger_3', name: '芝士汉堡', emoji: '🍔', rarity: 'rare', points: 0, obtainedAt: '', projectId: 'project_burger_3' },
    ],
  },
  {
    id: 'burger_4', name: '和牛汉堡', emoji: '👑', category: 'cooking', series: '汉堡',
    checkInsRequired: 15, animationClass: 'sparkle',
    possibleHarvests: [
      { id: 'harvest_burger_4', name: '和牛汉堡', emoji: '👑', rarity: 'legendary', points: 0, obtainedAt: '', projectId: 'project_burger_4' },
    ],
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