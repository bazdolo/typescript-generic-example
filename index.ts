function simpleStringState<T>(initial: T): [() => T, (v: T) => void] {
  let str: T = initial;
  return [
    () => str,
    (v: T) => {
      str = v;
    },
  ];
}

const [getResult, setResult] = simpleStringState('baz');
console.log(getResult());
setResult('yoooo');
console.log(getResult());

const [getResult1, setResult1] = simpleStringState<string | number>(30);
console.log(getResult1());
setResult1('yoooo');
console.log(getResult1());

type Rank<RankItem> = {
  item: RankItem;
  rank: number;
};

function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number
): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => b.rank - a.rank);
  return ranks.map((rank) => rank.item);
}

const chars = [
  { name: 'baz', hp: 20, atk: 10 },
  { name: 'bazzer', hp: 20, atk: 20 },
  { name: 'bazzer2', hp: 20, atk: 30 },
];

const result = ranker(chars, ({ atk }) => atk);

console.log(result);

const one = new Promise<string>((resolve, reject) => {
  resolve('45');
});

one.then((a) => a);
