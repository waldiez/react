import { useState } from "react";
import { AiFillOpenAI } from "react-icons/ai";
import { AiFillCode } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { FaBars, FaFileExport, FaFileImport, FaMoon, FaRobot, FaSun } from "react-icons/fa6";

import { EditFlowModal, ImportFlowModal } from "@waldiez/containers/sidebar/modals";
import { useSidebar } from "@waldiez/containers/sidebar/useSidebar";
import { useWaldiez } from "@waldiez/store";
import { useWaldiezTheme } from "@waldiez/theme";
import { AGENT_ICONS } from "@waldiez/theme";
import { WaldiezNodeType } from "@waldiez/types";
import { showSnackbar } from "@waldiez/utils";
import { downloadFile } from "@waldiez/utils";

type SidebarProps = {
    typeShown: WaldiezNodeType;
    onTypeShownChange: (nodeType: WaldiezNodeType) => void;
};

export const SideBar = (props: SidebarProps) => {
    const { typeShown, onTypeShownChange } = props;
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
    const flowId = useWaldiez(s => s.flowId);
    const getFlowInfo = useWaldiez(s => s.getFlowInfo);
    const exportFlow = useWaldiez(s => s.exportFlow);
    const { isCollapsed, toggleSidebar } = useSidebar();
    const { isDark, toggleTheme } = useWaldiezTheme();
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string, agentType?: string) => {
        event.dataTransfer.setData("application/node", nodeType);
        if (nodeType === "agent") {
            event.dataTransfer.setData("application/agent", agentType ?? "user");
        }
        event.dataTransfer.effectAllowed = "move";
    };
    const onShowAgents = () => {
        onTypeShownChange("agent");
    };
    const onShowModels = () => {
        onTypeShownChange("model");
    };
    const onShowSkills = () => {
        onTypeShownChange("skill");
    };
    const onUserDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        onDragStart(event, "agent");
    };
    const onAssistantDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        onDragStart(event, "agent", "assistant");
    };
    const onManagerDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        onDragStart(event, "agent", "manager");
    };
    const onSwarmDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        onDragStart(event, "agent", "swarm");
    };
    const onOpenEditModal = () => {
        setIsEditModalOpen(true);
    };
    const onCloseEditModal = () => {
        setIsEditModalOpen(false);
    };
    const onOpenImportModal = () => {
        setIsImportModalOpen(true);
    };
    const onCloseImportModal = () => {
        setIsImportModalOpen(false);
    };
    const onExport = (_e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const flow = exportFlow(true, false);
        const { name } = getFlowInfo();
        if (flow) {
            let fileName = name;
            if (fileName.length < 3) {
                fileName = "flow";
            }
            if (fileName.length > 100) {
                fileName = fileName.substring(0, 100);
            }
            const blob = new Blob([JSON.stringify(flow)], {
                type: "application/json",
            });
            downloadFile(blob, `${fileName}.waldiez`);
        } else {
            showSnackbar(flowId, "Could not export flow", "error", undefined, 3000);
        }
    };
    return (
        <div
            className="sidebar"
            data-testid={`sidebar-${flowId}`}
            style={{ width: isCollapsed ? "40px" : "200px" }}
        >
            <div
                className="sidebar-header"
                style={{
                    justifyContent: isCollapsed ? "center" : "space-between",
                    paddingLeft: isCollapsed ? "0" : "10px",
                }}
            >
                <div
                    role="button"
                    className={`${isCollapsed ? "hidden" : "clickable"}`}
                    id={`edit-flow-${flowId}-sidebar-button`}
                    data-testid={`edit-flow-${flowId}-sidebar-button`}
                    onClick={onOpenEditModal}
                    title="Edit flow"
                >
                    {!isCollapsed && (
                        <>
                            <FaEdit /> <span>Edit flow</span>
                        </>
                    )}
                </div>
                <div
                    className="sidebar-toggle"
                    onClick={toggleSidebar}
                    role="button"
                    aria-hidden="true"
                    data-testid="sidebar-toggle"
                >
                    <FaBars
                        className="sidebar-toggle-button tooltip-container clickable"
                        title={isCollapsed ? "Open sidebar" : "Close sidebar"}
                        aria-hidden="true"
                    />
                </div>
            </div>
            {!isCollapsed && (
                <div className="sidebar-content">
                    <ul>
                        <li
                            className="clickable"
                            data-node-type="agent"
                            data-testid="show-agents"
                            onClick={onShowAgents}
                        >
                            <FaRobot />
                            <span>Agents</span>
                        </li>
                        <li
                            className="clickable"
                            data-node-type="model"
                            data-testid="show-models"
                            onClick={onShowModels}
                        >
                            <AiFillOpenAI />
                            <span>Models</span>
                        </li>
                        <li
                            className="clickable"
                            data-node-type="skill"
                            data-testid="show-skills"
                            onClick={onShowSkills}
                        >
                            <AiFillCode />
                            <span>Skills</span>
                        </li>
                    </ul>
                    <div className="dnd-description">
                        <p>Drag n' drop an agent to the canvas to add it to the flow</p>
                    </div>
                    <div className="dnd-area" data-testid="user-dnd" onDragStart={onUserDragStart} draggable>
                        <img src={AGENT_ICONS.user} title="User Proxy Agent" />
                        User Proxy
                    </div>
                    <div
                        className="dnd-area"
                        data-testid="assistant-dnd"
                        onDragStart={onAssistantDragStart}
                        draggable
                    >
                        <img src={AGENT_ICONS.assistant} title="Assistant Agent" />
                        Assistant
                    </div>
                    <div
                        className="dnd-area"
                        data-testid="manager-dnd"
                        onDragStart={onManagerDragStart}
                        draggable
                    >
                        <img src={AGENT_ICONS.manager} title="Group Manager Agent" />
                        Group Manager
                    </div>
                    <div
                        className="dnd-area"
                        data-testid="swarm-dnd"
                        onDragStart={onSwarmDragStart}
                        draggable
                    >
                        <img src={AGENT_ICONS.swarm} title="Swarm Agent" />
                        Swarm Agent
                    </div>
                </div>
            )}
            <div className="spacer"></div>
            <div className="sidebar-footer">
                <ul>
                    <li
                        className="clickable"
                        onClick={onOpenImportModal}
                        title="Import flow"
                        data-testid={`import-flow-${flowId}-sidebar-button`}
                    >
                        <FaFileImport />
                        {!isCollapsed && <span>Import</span>}
                    </li>
                    <li
                        className="clickable"
                        onClick={onExport}
                        title="Export flow"
                        data-testid={`export-flow-${flowId}-sidebar-button`}
                    >
                        <FaFileExport />
                        {!isCollapsed && <span>Export</span>}
                    </li>
                    <li
                        className="clickable"
                        data-testid="theme-toggle"
                        onClick={toggleTheme}
                        title="Toggle theme"
                    >
                        {isDark ? <FaSun /> : <FaMoon />}
                        {!isCollapsed && <span>Toggle theme</span>}
                    </li>
                </ul>
            </div>
            {isEditModalOpen && (
                <EditFlowModal flowId={flowId} isOpen={isEditModalOpen} onClose={onCloseEditModal} />
            )}
            {isImportModalOpen && (
                <ImportFlowModal
                    flowId={flowId}
                    isOpen={isImportModalOpen}
                    onClose={onCloseImportModal}
                    typeShown={typeShown}
                    onTypeShownChange={onTypeShownChange}
                />
            )}
        </div>
    );
};
