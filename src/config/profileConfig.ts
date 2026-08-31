import type { ProfileConfig } from "@/types/config";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 博主资料：头像 / 名称 / 简介 / 社交链接（侧栏 Profile 卡片、页脚、RSS 作者等消费）。
 * 类型见 src/types/config.ts。
 */
export const profileConfig: ProfileConfig = withUserConfig("profile", {
	avatar: "/images/avatar.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "SMOPNIM",
	bio: "你的大脑遇到一些问题，需要复活。我们只收集一些死亡原因，然后为你在你的床或已充能的重生锚附近复活。100%已完成",
	links: [
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://space.bilibili.com/699607320",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/SMOPNIM",
		},
	],
});
