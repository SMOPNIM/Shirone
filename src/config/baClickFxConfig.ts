import type { BAClickFxConfig } from "@/types/config";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 蔚蓝档案风格点击特效与光标拖尾配置。
 * 禁用时不产生任何网络请求与额外 DOM。
 */
export const baClickFxConfig: BAClickFxConfig = withUserConfig("baClickFx", {
	enable: true,
	switchable: true,
	themeColor: "#47a6ff",
	scale: 1,
	opacity: 1,
	clickEnabled: true,
	trailEnabled: true,
	trailAlways: false,
});
