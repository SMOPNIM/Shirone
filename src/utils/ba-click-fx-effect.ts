/**
 * BA Click FX 特效模块
 * 管理蔚蓝档案风格点击特效与光标拖尾的初始化
 *
 * 使用动态 import() 延迟加载 ba-click-fx，
 * 避免 SSR / Node 环境访问 window 导致崩溃。
 */

import type { BAClickFxConfig } from "@/types/config";
import {
	getStoredBaClickFxColor,
	getStoredBaClickFxEnabled,
} from "@utils/setting-utils";

let instance: any = null;
let desiredEnabled = false;
let listenersAdded = false;

function destroyInstance(): void {
	if (!instance) return;
	try {
		instance.destroy();
	} catch (error) {
		console.warn("BAClickFX: destroy failed", error);
	}
	instance = null;
}

async function syncEnabled(enabled: boolean): Promise<void> {
	desiredEnabled = enabled;
	if (!enabled) {
		destroyInstance();
		return;
	}
	if (instance) return;

	try {
		const mod = await import("ba-click-fx");
		const BAClickFX = mod.BAClickFX ?? mod.default;
		instance = new BAClickFX({
			scale: 1,
			opacity: 1,
			themeColor: getStoredBaClickFxColor(),
			clickEnabled: true,
			trailEnabled: true,
			trailAlways: false,
		});
	} catch (error) {
		console.error("BAClickFX: init failed", error);
		instance = null;
	}
}

function addListeners(config: BAClickFxConfig): void {
	if (listenersAdded) return;
	listenersAdded = true;

	window.addEventListener("baclickfx-toggle", (e: Event) => {
		const detail = (e as CustomEvent).detail;
		void syncEnabled(!!detail?.enabled);
	});

	window.addEventListener("baclickfx-color-change", (e: Event) => {
		const detail = (e as CustomEvent).detail;
		if (instance && detail?.color) {
			instance.setThemeColor(detail.color);
		}
	});
}

function doInit(config: BAClickFxConfig): void {
	if (!config.enable) return;
	addListeners(config);
	void syncEnabled(getStoredBaClickFxEnabled());
}

export function setupBAClickFxOnDOMReady(config: BAClickFxConfig): void {
	if (typeof window === "undefined") return;

	const init = () => doInit(config);

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
}
