const DEFAULT_VARIANT = "unicorn";
const STORAGE_KEY = "variant";

const ext = globalThis.browser ?? globalThis.chrome;

const VARIANTS = {
  unicorn: {
    white: "assets/Chess_Ult45.svg",
    black: "assets/Chess_Udt45.svg",
  },
  zebra: {
    white: "assets/Chess_Zlt45.svg",
    black: "assets/Chess_Zdt45.svg",
  },
  dragon: {
    white: "assets/Chess_Dlt45.svg",
    black: "assets/Chess_Ddt45.svg",
  },
};

function normalizeVariant(value) {
  if (value === "regular") return "regular";
  return Object.prototype.hasOwnProperty.call(VARIANTS, value) ? value : DEFAULT_VARIANT;
}

function applyVariant(variantName) {
  const normalized = normalizeVariant(variantName);
  const root = document.documentElement;

  if (!root) return;

  if (normalized === "regular") {
    root.removeAttribute("data-lu-variant");
    root.style.removeProperty("--lu-white-knight");
    root.style.removeProperty("--lu-black-knight");
    return;
  }

  const variant = VARIANTS[normalized];
  root.setAttribute("data-lu-variant", normalized);
  root.style.setProperty(
    "--lu-white-knight",
    `url("${ext.runtime.getURL(variant.white)}")`
  );
  root.style.setProperty(
    "--lu-black-knight",
    `url("${ext.runtime.getURL(variant.black)}")`
  );
}

async function getStoredVariant() {
  const result = await ext.storage.sync.get({ [STORAGE_KEY]: DEFAULT_VARIANT });
  return result[STORAGE_KEY] ?? DEFAULT_VARIANT;
}

async function init() {
  const stored = await getStoredVariant();
  applyVariant(stored);

  ext.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync") return;
    if (!changes[STORAGE_KEY]) return;
    applyVariant(changes[STORAGE_KEY].newValue);
  });
}

init();
