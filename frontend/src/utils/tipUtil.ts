import { TipForm } from '@/app/GHOTab/Tip';
import { TipDetails } from '@/services/depositTip';

export const calcTipAmount = (amount: number) => {
  let amountHelper = amount * 10;
  let tip5 = Math.floor(amountHelper / 5);
  let remainder = amountHelper % 5;
  let tip1 = Math.floor(remainder / 5);
  return { tip1, tip5 };
};

export const calcTipDetail: (tipData: TipForm) => TipDetails = (tipData) => {
  const {
    amount,
    belowNumber,
    aboveNumber,
    belowPercent,
    middlePercent,
    abovePercent,
  } = tipData;
  const belowAmount = belowPercent * belowNumber;
  if (amount < belowNumber) {
    const totalAmount = amount * belowPercent;
    const { tip1, tip5 } = calcTipAmount(totalAmount / 100);
    return {
      totalTip: totalAmount / 100,
      tip1,
      tip5,
    };
  }
  if (amount < aboveNumber) {
    let middleAmount = (amount - belowNumber) * middlePercent;
    const totalAmount = belowAmount + middleAmount;
    const { tip1, tip5 } = calcTipAmount(totalAmount / 100);
    return {
      totalTip: totalAmount / 100,
      tip1,
      tip5,
    };
  }
  let middleAmount = (aboveNumber - belowNumber) * middlePercent;
  let aboveAmount = (amount - aboveNumber) * abovePercent;
  const totalAmount = belowAmount + middleAmount + aboveAmount;
  const { tip1, tip5 } = calcTipAmount(totalAmount / 100);
  return {
    totalTip: totalAmount / 100,
    tip1,
    tip5,
  };
};
