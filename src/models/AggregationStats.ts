export type AggregationStatsApi = {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_at: number;
  big_spent_at: number;
  less_spent_value: number;
  big_spent_value: number;
  average_spend_galactic: number;
  big_spent_civ: string;
  less_spent_civ: string;
};

export type AggregationStatsModel = {
  totalSpendGalactic: number;
  rowsAffected: number;
  lessSpentAt: number;
  bigSpentAt: number;
  lessSpentValue: number;
  bigSpentValue: number;
  averageSpendGalactic: number;
  bigSpentCiv: string;
  lessSpentCiv: string;
};

export const aggregationStatsParamToDesc = (key: keyof AggregationStatsModel): string => {
  const conv: { [key in keyof AggregationStatsModel]: string } = {
    totalSpendGalactic: 'общие расходы в галактических кредитах',
    rowsAffected: 'количество обработанных записей',
    lessSpentCiv: 'цивилизация с минимальными расходами',
    bigSpentCiv: 'цивилизация с максимальными расходами',
    lessSpentAt: 'день года с минимальными расходами',
    bigSpentAt: 'день года с максимальными расходами',
    lessSpentValue: 'минимальная сумма расходов за день',
    bigSpentValue: 'максимальная сумма расходов за день',
    averageSpendGalactic: 'средние расходы в галактических кредитах',
  };
  return conv[key];
};

export const normalizeStats = (data: AggregationStatsApi): AggregationStatsModel | null => {
  try {
    const formatValue = (value: number): number => {
      const str = value.toString();
      const decimalPart = str.split('.')[1];
      if (!decimalPart || decimalPart.length <= 2) {
        return Number(str);
      }
      return Number(value.toFixed(2));
    };

    return {
      totalSpendGalactic: formatValue(data.total_spend_galactic),
      rowsAffected: data.rows_affected,
      lessSpentAt: data.less_spent_at,
      bigSpentAt: data.big_spent_at,
      lessSpentValue: formatValue(data.less_spent_value),
      bigSpentValue: formatValue(data.big_spent_value),
      averageSpendGalactic: formatValue(data.average_spend_galactic),
      bigSpentCiv: data.big_spent_civ,
      lessSpentCiv: data.less_spent_civ,
    };
  } catch {
    return null;
  }
};
