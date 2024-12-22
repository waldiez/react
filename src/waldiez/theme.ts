import assistantSvg from "@waldiez/assets/assistant.svg";
import azure from "@waldiez/assets/logos/azure.svg";
import anthropic from "@waldiez/assets/logos/claude.svg";
import google from "@waldiez/assets/logos/gemini.svg";
import groq from "@waldiez/assets/logos/groq.svg";
import mistral from "@waldiez/assets/logos/mistral.svg";
import nim from "@waldiez/assets/logos/nim.svg";
import openai from "@waldiez/assets/logos/openai.svg";
import together from "@waldiez/assets/logos/together.svg";
import managerSvg from "@waldiez/assets/manager.svg";
import userSvg from "@waldiez/assets/user.svg";

export { isDarkMode, setDarkMode, toggleThemeMode } from "@waldiez/utils/storage/theme";

export const LOGOS = {
    openai,
    azure,
    google,
    gemini: google,
    anthropic,
    mistral,
    groq,
    together,
    nim,
    other: openai,
};
export const AGENT_COLORS = {
    agent: "#005490",
    assistant: "#66bc57",
    user: "#bc76f5",
    manager: "#ed8a34",
    rag_user: "#e34561",
};
export const AGENT_ICONS = {
    user: userSvg,
    assistant: assistantSvg,
    manager: managerSvg,
};
