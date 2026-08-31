/**
 * 项目页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/projectsConfig.ts 控制。
 */
import type { ProjectItem } from "@/types/projectsConfig";

export const projectsData: ProjectItem[] = [
	// {
	// 	key: "mizuki",
	// 	title: "Mizuki",
	// 	summary:
	// 		"A next-gen Material Design 3 blog theme built with Astro, featuring i18n, dark mode, and responsive design.",
	// 	category: "web",
	// 	technologies: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
	// 	phase: "shipped",
	// 	repository: "https://github.com/LyraVoid/Mizuki",
	// 	website: "https://mizuki.mysqil.com",
	// 	featured: true,
	// },
	// {
	// 	key: "folkpatch",
	// 	title: "FolkPatch",
	// 	summary:
	// 		"A kernel-level ROOT solution based on KernelPatch, with polished UI, APM module system, and KPM kernel module support.",
	// 	category: "mobile",
	// 	technologies: ["Kotlin", "Rust", "C++", "Java"],
	// 	phase: "building",
	// 	repository: "https://github.com/LyraVoid/FolkPatch",
	// 	website: "https://fp.mysqil.com",
	// 	featured: true,
	// },
	// {
	// 	key: "folktool",
	// 	title: "FolkTool",
	// 	summary:
	// 		"A fast ROOT flashing tool for FolkPatch with a graphical interface and automated operations, simplifying the complex flashing process.",
	// 	category: "desktop",
	// 	technologies: ["Flutter", "Dart", "C++", "CMake"],
	// 	phase: "shipped",
	// 	repository: "https://github.com/LyraVoid/FolkTool",
	// },
	// {
	// 	key: "folkadb",
	// 	title: "FolkADB",
	// 	summary:
	// 		"A portable ADB/Fastboot tool written in C, featuring interactive CLI, Tab completion, drag-and-drop module installation, and Shizuku activation.",
	// 	category: "desktop",
	// 	technologies: ["C"],
	// 	phase: "shipped",
	// 	repository: "https://github.com/LyraVoid/FolkADB",
	// },
	// {
	// 	key: "folksplash",
	// 	title: "FolkSplash",
	// 	summary:
	// 		"A web-based splash.img visualizer for OPPO/Realme/OnePlus devices, supporting unpack, preview, replace, and repack.",
	// 	category: "web",
	// 	technologies: ["React", "TypeScript", "Vite", "Material-UI", "Zustand"],
	// 	phase: "shipped",
	// 	repository: "https://github.com/LyraVoid/FolkSplash",
	// 	website: "https://splash.mysqil.com",
	// },
];

/** 获取所有项目数据列表 */
export function getProjectsList(): ProjectItem[] {
	return projectsData;
}
