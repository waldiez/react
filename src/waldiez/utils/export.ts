export const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};

export const exportItem = (
    name: string,
    itemType: "model" | "skill" | "agent" | "flow",
    exporter: () => { [key: string]: unknown } | null,
) => {
    const item = exporter();
    if (item) {
        let extension = ".waldiez";
        if (itemType !== "flow") {
            // .waldiezModel, .waldiezSkill, .waldiezAgent
            extension += itemType.charAt(0).toUpperCase() + itemType.slice(1);
        }
        const itemString = JSON.stringify(item, null, 2);
        const blob = new Blob([itemString], { type: "application/json" });
        downloadFile(blob, `${name}${extension}`);
    }
};
