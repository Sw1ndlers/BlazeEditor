import { FileElement } from "@/utils/Types/FileSystem";
import {
	IconAppWindow,
	IconBrandReact,
	IconBrandTypescript,
	IconFile,
	IconFileTypePdf,
	IconBrandPython,
	IconBrandRust,
	IconBraces,
	IconMarkdown,
	IconPhoto,
	IconBrandCpp,
	IconBrandHtml5,
	IconBrandCss3,
	IconBrandJavascript,
	IconBrandPhp,
	IconBrandSwift,
	IconBrandKotlin,
	IconBrandFlutter,
	IconBrandAngular,
	IconBrandSvelte,
	IconBrandYarn,
	IconBrandSass,
    IconBrandGithubFilled,
} from "@tabler/icons-react";

type ElementIconProps = {
	size: number;
	color: string;
	strokeWidth: number;
	className: string;
};

function getElementIcon(element: FileElement, iconProps: ElementIconProps) {
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
    }
    
    const extentionIcon = iconMap[element.extension];

    if (extentionIcon) {
        return extentionIcon;
    }

    const nameIcon = nameMap[element.name];

    if (nameIcon) {
        return nameIcon;
    }

    return <IconFile {...iconProps} />;

	// return iconMap[element.extension] || <IconFile {...iconProps} />;
}

export default function FileNode({
	fileElement,
	iconColor,
}: {
	fileElement: FileElement;
	iconColor: string;
}) {
	const iconProps = {
		size: 15,
		className: "-mr-1",
		strokeWidth: 1.2,
		color: iconColor,
	};

	return (
		<li>
			<a>
				{getElementIcon(fileElement, iconProps)}
				<p className="text-ellipsis overflow-hidden text-nowrap">
					{fileElement.name}
				</p>
			</a>
		</li>
	);
}
