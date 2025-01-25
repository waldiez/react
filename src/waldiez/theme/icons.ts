/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import assistantWebp from "@waldiez/assets/assistant.webp";
import azure from "@waldiez/assets/logos/azure.svg";
import anthropic from "@waldiez/assets/logos/claude.svg";
import google from "@waldiez/assets/logos/gemini.svg";
import groq from "@waldiez/assets/logos/groq.svg";
import mistral from "@waldiez/assets/logos/mistral.svg";
import nim from "@waldiez/assets/logos/nim.svg";
import openai from "@waldiez/assets/logos/openai.svg";
import together from "@waldiez/assets/logos/together.svg";
import managerWebp from "@waldiez/assets/manager.webp";
import swarmAgentWebp from "@waldiez/assets/swarm.webp";
import userWebp from "@waldiez/assets/user.webp";

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
export const AGENT_ICONS = {
    user: userWebp,
    assistant: assistantWebp,
    manager: managerWebp,
    swarm: swarmAgentWebp,
};
