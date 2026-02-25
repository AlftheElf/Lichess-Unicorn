# Lichess Unicorn Knights (Firefox)

A tiny Firefox extension that replaces the knight piece graphics on **lichess.org** with unicorn/zebra/dragon SVGs.

## Install (temporary / dev)

1. Open Firefox and go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on…**
3. Select: `extension/manifest.json`
4. Visit https://lichess.org and start a game / analysis board.

## Switching variants

- Click the extension’s toolbar button.
- Pick **Unicorn**, **Zebra**, or **Dragon**.

## How it works

- Injects a small CSS file on lichess.org.
- Overrides the background image of Chessground knight pieces.

## Assets / attribution

This project includes SVGs from Wikimedia Commons. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
