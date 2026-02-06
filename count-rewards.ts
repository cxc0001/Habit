// 用于统计奖励项目数量的脚本
import { allRewardItems } from './src/data/rewards';

console.log('总奖励项目数量:', allRewardItems.length);

// 按类别统计
const plantCount = allRewardItems.filter(item => item.category === 'plant').length;
const animalCount = allRewardItems.filter(item => item.category === 'animal').length;
const cookingCount = allRewardItems.filter(item => item.category === 'cooking').length;

console.log('植物类项目数量:', plantCount);
console.log('动物类项目数量:', animalCount);
console.log('烹饪类项目数量:', cookingCount);

// 按稀有度统计
const commonCount = allRewardItems.filter(item => item.possibleHarvests[0].rarity === 'common').length;
const uncommonCount = allRewardItems.filter(item => item.possibleHarvests[0].rarity === 'uncommon').length;
const rareCount = allRewardItems.filter(item => item.possibleHarvests[0].rarity === 'rare').length;
const legendaryCount = allRewardItems.filter(item => item.possibleHarvests[0].rarity === 'legendary').length;

console.log('普通项目数量:', commonCount);
console.log('优良项目数量:', uncommonCount);
console.log('稀有项目数量:', rareCount);
console.log('传说项目数量:', legendaryCount);

// 按系列统计
const seriesNames = [...new Set(allRewardItems.map(item => item.series))];
console.log('总系列数量:', seriesNames.length);
console.log('各系列名称:', seriesNames);