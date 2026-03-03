# Lichess Unicorn Knights

A tiny browser extension that replaces the knight piece graphics on **lichess.org** with unicorn, zebra, dragon — or just regular horse SVGs.

Works on **Firefox** and **Chrome**.

---

## Install

| Browser | Store link |
|---------|------------|
| **Chrome** | [Chrome Web Store](https://chromewebstore.google.com/detail/lichess-unicorn-knights/dpfihgekdcfnkknghkdanhdimklkioph) |
| **Firefox** | [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/lichess-unicorn-knights/) |

---

## Load manually (developers)

### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on…**
3. Select `extension/manifest.json`

### Chrome

1. **Download the zip** from the [latest GitHub release](https://github.com/AlftheElf/Lichess-Unicorn/releases/latest) — `lichess-unicorn-chrome.zip`
2. **Unzip** it somewhere permanent — don't delete this folder, Chrome needs it to stay
3. Open `chrome://extensions`
4. Enable **Developer mode** (toggle, top-right)
5. Click **Load unpacked** and select the unzipped folder

---

## Switching variants

Click the extension's toolbar button and pick:

- **Horse** — standard Lichess knights (extension is effectively off)
- **Unicorn**
- **Zebra**
- **Dragon**

---

## How it works

- Injects a small CSS file on lichess.org
- Overrides the background image of Chessground knight pieces via CSS custom properties
- Variant choice is synced via `storage.sync`

## Assets / attribution

SVGs from Wikimedia Commons. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html)
