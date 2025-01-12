import { getFlowRoot } from "@waldiez/utils";

export const showSnackbar = (
    flowId: string,
    message: string,
    level: string = "info",
    duration: number = 3000,
) => {
    if (window.localStorage.getItem(`snackbar-${flowId}.lock`)) {
        setTimeout(() => {
            showSnackbar(flowId, message, level, duration);
        }, 100);
    } else {
        window.localStorage.setItem(`snackbar-${flowId}.lock`, "1");
        const rootDiv = getFlowRoot(flowId, true)!;
        let snackbar = rootDiv.querySelector(`#${flowId}-snackbar`);
        if (!snackbar) {
            snackbar = document.createElement("div");
            snackbar.id = `${flowId}-snackbar`;
        }
        snackbar.innerHTML = message;
        snackbar.classList.add("show");
        snackbar.classList.add("snackbar");
        snackbar.classList.add(level);
        rootDiv.appendChild(snackbar);
        setTimeout(() => {
            window.localStorage.removeItem(`snackbar-${flowId}.lock`);
            rootDiv.removeChild(snackbar);
        }, duration);
    }
};
