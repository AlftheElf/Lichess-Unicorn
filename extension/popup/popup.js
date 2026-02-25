const DEFAULT_VARIANT = "unicorn";
const STORAGE_KEY = "variant";

const ext = globalThis.browser ?? globalThis.chrome;
if (!ext?.storage?.sync) {
  throw new Error("Extension storage API not available in this context");
}

async function getVariant() {
  const result = await ext.storage.sync.get({ [STORAGE_KEY]: DEFAULT_VARIANT });
  return result[STORAGE_KEY] ?? DEFAULT_VARIANT;
}

async function setVariant(variant) {
  await ext.storage.sync.set({ [STORAGE_KEY]: variant });
}

function getSelectedRadio() {
  return document.querySelector('input[name="variant"]:checked');
}

function setSelectedRadio(variant) {
  const radio = document.querySelector(`input[name="variant"][value="${variant}"]`);
  if (radio) radio.checked = true;
}

async function init() {
  const variant = await getVariant();
  setSelectedRadio(variant);

  document.getElementById("variantForm").addEventListener("change", async () => {
    const selected = getSelectedRadio();
    if (!selected) return;
    await setVariant(selected.value);
  });
}

init();
