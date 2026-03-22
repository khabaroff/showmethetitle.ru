import data from "./data/titles.json";
import { createTitleFromData } from "./lib/generator.js";
import { getNextScale } from "./lib/fitTitle.js";

const titleNode = document.getElementById("txt");
const refreshButton = document.getElementById("btn");
const contentNode = document.getElementById("content");

if (!titleNode || !refreshButton || !contentNode) {
  throw new Error("Required app shell nodes are missing.");
}

titleNode.setAttribute("aria-live", "polite");

const themeClasses = [
  "site1",
  "site2",
  "site3",
  "site4",
  "site5",
  "site6",
  "site7",
  "site8",
  "site9",
];

let fitFrameId = 0;
let refreshTurns = 0;

function setThemeClass() {
  document.body.classList.remove(...themeClasses);
  document.body.classList.add(themeClasses[Math.floor(Math.random() * themeClasses.length)]);
}

function setTitleScale(scale) {
  contentNode.style.setProperty("--title-scale", String(scale));
}

function titleFits() {
  return (
    contentNode.scrollHeight <= contentNode.clientHeight &&
    contentNode.scrollWidth <= contentNode.clientWidth
  );
}

function fitTitle() {
  cancelAnimationFrame(fitFrameId);

  fitFrameId = requestAnimationFrame(() => {
    let currentScale = 1;

    setTitleScale(currentScale);

    let fits = titleFits();

    while (!fits) {
      const nextScale = getNextScale({ fits, currentScale });

      if (nextScale === currentScale) {
        break;
      }

      currentScale = nextScale;
      setTitleScale(currentScale);
      fits = titleFits();
    }
  });
}

function renderTitle({ spinRefresh = false } = {}) {
  const title = createTitleFromData(data);

  titleNode.textContent = title;
  document.title = title;
  setThemeClass();
  setTitleScale(1);

  if (spinRefresh) {
    refreshTurns += 1;
    refreshButton.style.setProperty("--refresh-rotation", `${refreshTurns * 360}deg`);
  }

  fitTitle();
}

refreshButton.addEventListener("click", () => renderTitle({ spinRefresh: true }));

window.addEventListener("keydown", (event) => {
  if (event.code !== "Space" || event.repeat || document.activeElement === refreshButton) {
    return;
  }

  event.preventDefault();
  renderTitle({ spinRefresh: true });
});

window.addEventListener("resize", fitTitle);

if (document.fonts?.ready) {
  void document.fonts.ready.then(fitTitle);
}

renderTitle();
