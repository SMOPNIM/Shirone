import {
	AUTO_MODE,
	DARK_MODE,
	DEFAULT_THEME,
	LIGHT_MODE,
	TEXTURE_CHANGE_EVENT,
	TEXTURE_OPACITY_KEY,
	TEXTURE_PRESET_KEY,
	TEXTURE_PRESETS,
	WALLPAPER_MODE_CHANGE_EVENT,
	WALLPAPER_MODE_KEY,
} from "@constants/constants.ts";
import { applyCurrentScheme } from "@utils/theme-utils";
import { baClickFxConfig, expressiveCodeConfig, siteConfig } from "@/config";
import type { LIGHT_DARK_MODE, WallpaperMode } from "@/types/config";
import type { TexturePreset } from "@/types/textureConfig";

export function isTexturePreset(value: unknown): value is TexturePreset {
	return (
		typeof value === "string" &&
		(TEXTURE_PRESETS as readonly string[]).includes(value)
	);
}

export function getDefaultTexturePreset(): TexturePreset {
	const textureCfg =
		typeof siteConfig.texture === "object" ? siteConfig.texture : undefined;
	const fallback = textureCfg?.defaultPreset ?? "starlight";
	const value =
		document.getElementById("config-carrier")?.dataset.texturePreset;
	return isTexturePreset(value) ? value : fallback;
}

export function getStoredTexturePreset(): TexturePreset {
	const value = localStorage.getItem(TEXTURE_PRESET_KEY);
	return isTexturePreset(value) ? value : getDefaultTexturePreset();
}

export function setTexturePreset(preset: TexturePreset): void {
	localStorage.setItem(TEXTURE_PRESET_KEY, preset);
	document.documentElement.dataset.texturePreset = preset;
	window.dispatchEvent(
		new CustomEvent(TEXTURE_CHANGE_EVENT, {
			detail: { preset, opacity: getStoredTextureOpacity() },
		}),
	);
}

export function getDefaultTextureOpacity(): number {
	const textureCfg =
		typeof siteConfig.texture === "object" ? siteConfig.texture : undefined;
	const fallback = textureCfg?.defaultOpacity ?? 0.12;
	const carrier = document.getElementById("config-carrier");
	const val = carrier?.dataset.textureOpacity;
	if (val) {
		const parsed = Number.parseFloat(val);
		if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 1) {
			return parsed;
		}
	}
	return fallback;
}

export function getStoredTextureOpacity(): number {
	const value = localStorage.getItem(TEXTURE_OPACITY_KEY);
	if (value) {
		const parsed = Number.parseFloat(value);
		if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 1) {
			return parsed;
		}
	}
	return getDefaultTextureOpacity();
}

export function setTextureOpacity(opacity: number): void {
	const clamped = Math.min(Math.max(opacity, 0), 1);
	localStorage.setItem(TEXTURE_OPACITY_KEY, String(clamped));
	document.documentElement.style.setProperty(
		"--texture-opacity",
		String(clamped),
	);
	window.dispatchEvent(
		new CustomEvent(TEXTURE_CHANGE_EVENT, {
			detail: { preset: getStoredTexturePreset(), opacity: clamped },
		}),
	);
}

export function isWallpaperMode(value: unknown): value is WallpaperMode {
	return value === "banner" || value === "none";
}

export function getDefaultWallpaperMode(): WallpaperMode {
	const value =
		document.getElementById("config-carrier")?.dataset.wallpaperMode;
	return isWallpaperMode(value) ? value : "none";
}

export function getStoredWallpaperMode(): WallpaperMode {
	const value = localStorage.getItem(WALLPAPER_MODE_KEY);
	return isWallpaperMode(value) ? value : getDefaultWallpaperMode();
}

export function setWallpaperMode(mode: WallpaperMode): void {
	localStorage.setItem(WALLPAPER_MODE_KEY, mode);
	document.documentElement.dataset.wallpaperMode = mode;
	window.dispatchEvent(
		new CustomEvent(WALLPAPER_MODE_CHANGE_EVENT, { detail: { mode } }),
	);
}

export function getDefaultHue(): number {
	const fallback = "250";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback, 10);
}

export function getHue(): number {
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored, 10) : getDefaultHue();
}

export function setHue(hue: number): void {
	localStorage.setItem("hue", String(hue));
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(hue));
	applyCurrentScheme();
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
	switch (theme) {
		case LIGHT_MODE:
			document.documentElement.classList.remove("dark");
			break;
		case DARK_MODE:
			document.documentElement.classList.add("dark");
			break;
		case AUTO_MODE:
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			break;
	}

	// Set the theme for Expressive Code based on current mode
	// (light/dark code block themes)
	const isDark = document.documentElement.classList.contains("dark");
	document.documentElement.setAttribute(
		"data-theme",
		isDark
			? (expressiveCodeConfig.darkTheme ?? expressiveCodeConfig.theme)
			: (expressiveCodeConfig.lightTheme ?? expressiveCodeConfig.theme),
	);

	// Dark mode affects the resolved M3/M3E scheme
	applyCurrentScheme();
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
	localStorage.setItem("theme", theme);
	applyThemeToDocument(theme);
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	return (localStorage.getItem("theme") as LIGHT_DARK_MODE) || DEFAULT_THEME;
}

const MOTION_KEY = "mc-motion";

/** 是否开启「减少动态效果」（手动覆盖 prefers-reduced-motion） */
export function getMotionPreference(): boolean {
	return localStorage.getItem(MOTION_KEY) === "reduced";
}

export function applyMotionPreference(reduced: boolean): void {
	document.documentElement.classList.toggle("motion-reduced", reduced);
}

export function setMotionPreference(reduced: boolean): void {
	localStorage.setItem(MOTION_KEY, reduced ? "reduced" : "full");
	applyMotionPreference(reduced);
}

// ─── BA Click FX ─────────────────────────────────────────────

const DEFAULT_BA_CLICK_FX_COLOR = "#47a6ff";

function isValidHexColor(value: string): boolean {
	return /^#[0-9a-fA-F]{6}$/.test(value);
}

export function getDefaultBaClickFxEnabled(): boolean {
	return baClickFxConfig.enable ?? false;
}

export function getStoredBaClickFxEnabled(): boolean {
	if (!(baClickFxConfig.switchable ?? true)) {
		return getDefaultBaClickFxEnabled();
	}
	const stored = localStorage.getItem("baClickFxEnabled");
	return stored !== null ? stored === "true" : getDefaultBaClickFxEnabled();
}

export function setBaClickFxEnabled(enabled: boolean): void {
	localStorage.setItem("baClickFxEnabled", String(enabled));
	window.dispatchEvent(
		new CustomEvent("baclickfx-toggle", { detail: { enabled } }),
	);
}

export function getDefaultBaClickFxColor(): string {
	return isValidHexColor(baClickFxConfig.themeColor)
		? baClickFxConfig.themeColor
		: DEFAULT_BA_CLICK_FX_COLOR;
}

export function getStoredBaClickFxColor(): string {
	const stored = localStorage.getItem("baClickFxColor");
	return stored && isValidHexColor(stored)
		? stored.toLowerCase()
		: getDefaultBaClickFxColor();
}

export function setBaClickFxColor(color: string): void {
	localStorage.setItem("baClickFxColor", color);
	window.dispatchEvent(
		new CustomEvent("baclickfx-color-change", { detail: { color } }),
	);
}

/** HSL 转 six-digit hex，用于特效颜色滑块。滑块仅调色相，s/l 固定为 100%/64%。 */
export function hslToHex(h: number, s = 100, l = 64): string {
	const sn = s / 100;
	const ln = l / 100;
	const k = (n: number) => (n + h / 30) % 12;
	const a = sn * Math.min(ln, 1 - ln);
	const f = (n: number) =>
		ln - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	const to255 = (x: number) =>
		Math.round(255 * x)
			.toString(16)
			.padStart(2, "0");
	return `#${to255(f(0))}${to255(f(8))}${to255(f(4))}`;
}

/** 六位 hex 转色相角度（0~359），非法输入回退游戏蓝色相。 */
export function hexToHue(hex: string): number {
	const raw = hex.replace("#", "");
	if (!/^[0-9a-fA-F]{6}$/.test(raw)) return 210;
	const r = Number.parseInt(raw.slice(0, 2), 16) / 255;
	const g = Number.parseInt(raw.slice(2, 4), 16) / 255;
	const b = Number.parseInt(raw.slice(4, 6), 16) / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	if (max === min) return 0;
	const d = max - min;
	let hueDeg: number;
	switch (max) {
		case r:
			hueDeg = (g - b) / d + (g < b ? 6 : 0);
			break;
		case g:
			hueDeg = (b - r) / d + 2;
			break;
		default:
			hueDeg = (r - g) / d + 4;
	}
	return Math.round(hueDeg * 60) % 360;
}
