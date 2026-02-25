#!/usr/bin/env node
// build.js — packages the extension for Firefox and Chrome
//
// Output:
//   dist/lichess-unicorn-firefox.zip  — includes browser_specific_settings
//   dist/lichess-unicorn-chrome.zip   — browser_specific_settings removed

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const EXT  = path.join(ROOT, "extension");
const DIST = path.join(ROOT, "dist");
const TMP  = path.join(ROOT, ".build-tmp");

fs.mkdirSync(DIST, { recursive: true });

function rimraf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

function buildFirefox() {
  const out = path.join(DIST, "lichess-unicorn-firefox.zip");
  if (fs.existsSync(out)) fs.unlinkSync(out);
  execSync(`zip -r "${out}" .`, { cwd: EXT, stdio: "inherit" });
  console.log("✓ Firefox → dist/lichess-unicorn-firefox.zip");
}

function buildChrome() {
  rimraf(TMP);
  copyDir(EXT, TMP);

  // Chrome doesn't need (and shouldn't have) browser_specific_settings
  const manifestPath = path.join(TMP, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  delete manifest.browser_specific_settings;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

  const out = path.join(DIST, "lichess-unicorn-chrome.zip");
  if (fs.existsSync(out)) fs.unlinkSync(out);
  execSync(`zip -r "${out}" .`, { cwd: TMP, stdio: "inherit" });
  rimraf(TMP);
  console.log("✓ Chrome  → dist/lichess-unicorn-chrome.zip");
}

buildFirefox();
buildChrome();
