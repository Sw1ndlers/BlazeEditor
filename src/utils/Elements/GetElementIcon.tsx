import {
	IconAppWindow,
	IconBraces,
	IconBrandAngular,
	IconBrandCpp,
	IconBrandCss3,
	IconBrandFlutter,
	IconBrandGithubFilled,
	IconBrandHtml5,
	IconBrandJavascript,
	IconBrandKotlin,
	IconBrandPhp,
	IconBrandPython,
	IconBrandReact,
	IconBrandRust,
	IconBrandSass,
	IconBrandSvelte,
	IconBrandSwift,
	IconBrandTypescript,
	IconBrandYarn,
	IconFile,
	IconFileTypePdf,
	IconMarkdown,
	IconPhoto,
} from "@tabler/icons-react";
import { FileElement } from "../Types/FileSystem";

export type ElementIconProps = {
	size: number;
	color: string;
	strokeWidth: number;
	className: string;
};

export default function getElementIcon(
	element: FileElement,
	iconProps: ElementIconProps,
) {
	const iconMap: Record<string, React.ReactElement> = {
		ts: <IconBrandTypescript {...iconProps} />,
		tsx: <IconBrandReact {...iconProps} />,
		exe: <IconAppWindow {...iconProps} />,
		pdf: <IconFileTypePdf {...iconProps} />,
		py: <IconBrandPython {...iconProps} />,
		rs: <IconBrandRust {...iconProps} />,
		json: <IconBraces {...iconProps} />,
		md: <IconMarkdown {...iconProps} />,
		jpg: <IconPhoto {...iconProps} />,
		png: <IconPhoto {...iconProps} />,
		cpp: <IconBrandCpp {...iconProps} />,
		html: <IconBrandHtml5 {...iconProps} />,
		css: <IconBrandCss3 {...iconProps} />,
		js: <IconBrandJavascript {...iconProps} />,
		php: <IconBrandPhp {...iconProps} />,
		swift: <IconBrandSwift {...iconProps} />,
		kt: <IconBrandKotlin {...iconProps} />,
		flutter: <IconBrandFlutter {...iconProps} />,
		angular: <IconBrandAngular {...iconProps} />,
		svelte: <IconBrandSvelte {...iconProps} />,
		yarn: <IconBrandYarn {...iconProps} />,
		sass: <IconBrandSass {...iconProps} />,
	};

	const nameMap: Record<string, React.ReactElement> = {
		".gitignore": <IconBrandGithubFilled {...iconProps} />,
	};

	const extentionIcon = iconMap[element.extension];

	if (extentionIcon) {
		return extentionIcon;
	}

	const nameIcon = nameMap[element.name];

	if (nameIcon) {
		return nameIcon;
	}

	return <IconFile {...iconProps} />;
}
