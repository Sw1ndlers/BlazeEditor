/// Get folder name from full path
export function getFolderName(path: string) {
	return path.split("\\").pop(); // Get last element
}
