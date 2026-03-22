export function buildTitle(part1, part2, part3) {
  return `${part1} ${part2}, ${part3}`;
}

export function pickRandom(items, random = Math.random) {
  return items[Math.floor(random() * items.length)];
}

export function createTitleFromData(data, random = Math.random) {
  return buildTitle(
    pickRandom(data.part1, random),
    pickRandom(data.part2, random),
    pickRandom(data.part3, random)
  );
}
