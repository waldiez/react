export function showSnackbar(flowId: string, message: string, level?: string, duration?: number): void {
  if (window.localStorage.getItem(`snackbar-${flowId}.lock`)) {
    setTimeout(() => {
      showSnackbar(flowId, message, level, duration);
    }, 100);
  } else {
    window.localStorage.setItem(`snackbar-${flowId}.lock`, '1');
    let rootDiv = document.getElementById(`rf-root-${flowId}`);
    if (!rootDiv) {
      rootDiv = document.body;
    }
    let snackbar = rootDiv.querySelector(`#${flowId}-snackbar`);
    if (!snackbar) {
      snackbar = document.createElement('div');
      snackbar.id = `${flowId}-snackbar`;
    }
    if (!duration) {
      duration = 3000;
    }
    if (!level) {
      level = 'info';
    }
    snackbar.innerHTML = message;
    snackbar.classList.add('show');
    snackbar.classList.add('snackbar');
    snackbar.classList.add(level);
    rootDiv.appendChild(snackbar);
    setTimeout(() => {
      window.localStorage.removeItem(`snackbar-${flowId}.lock`);
      rootDiv.removeChild(snackbar);
    }, duration);
  }
}
