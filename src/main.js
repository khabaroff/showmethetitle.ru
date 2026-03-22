import data from "./data/titles.json";
import { createTitleFromData } from "./lib/generator.js";

const titleNode = document.getElementById("txt");
const refreshButton = document.getElementById("btn");

if (!titleNode || !refreshButton) {
  throw new Error("Required app shell nodes are missing.");
}

titleNode.setAttribute("aria-live", "polite");

function renderTitle() {
  const title = createTitleFromData(data);
  titleNode.textContent = title;
  document.title = title;
}

refreshButton.addEventListener("click", renderTitle);

window.addEventListener("keydown", (event) => {
  if (event.code !== "Space" || event.repeat || document.activeElement === refreshButton) {
    return;
  }

  event.preventDefault();
  renderTitle();
});

renderTitle();
