/**
 * 设备展示页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/devicesConfig.ts 控制。
 */
import type { DeviceItem } from "@/types/devicesConfig";

export const devicesData: DeviceItem[] = [
	{
		id: "iphone-xr",
		name: "iPhone XR",
		brand: "Apple",
		category: "mobile",
		status: "active",
		specs: "Black / 128GB",
		description: "A12 仿生，原深感摄像头，无线充电生态。",
		icon: "material-symbols:phone-iphone",
		year: "2018",
		link: "https://www.apple.com.cn/newsroom/2018/09/apple-introduces-iphone-xr/",
	},
	{
		id: "dell-inspiron-5593",
		name: "Inspiron 5593",
		brand: "Dell",
		category: "desk",
		status: "active",
		specs: "8GB + 512GB",
		description: "十代酷睿，全高清屏，全能接口。",
		icon: "material-symbols:desktop-windows-outline-rounded",
		year: "2019",
		link: "https://www.dell.com/support/product-details/zh-cn/product/inspiron-15-5593-laptop/overview",
	},
];

/** 获取所有设备数据列表 */
export function getDevicesList(): DeviceItem[] {
	return devicesData;
}
