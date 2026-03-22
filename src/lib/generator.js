export function buildTitle(part1, part2, part3) {
  return `${part1} ${part2}, ${part3}`;
}

function normalizeTitlePart(part) {
  return part.replaceAll("&nbsp;", "\u00a0");
}

export function pickRandom(items, random = Math.random) {
  return items[Math.floor(random() * items.length)];
}

export function createTitleFromData(data, random = Math.random) {
  return buildTitle(
    normalizeTitlePart(pickRandom(data.part1, random)),
    normalizeTitlePart(pickRandom(data.part2, random)),
    normalizeTitlePart(pickRandom(data.part3, random))
  );
}
