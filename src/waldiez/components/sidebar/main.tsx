import { AiFillOpenAI } from "react-icons/ai";
import { AiFillCode } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { FaFileExport, FaFileImport, FaMoon, FaRobot, FaSun } from "react-icons/fa6";

import { useSideBar } from "@waldiez/components/sidebar/hooks";
import { EditFlowModal, ImportFlowModal } from "@waldiez/components/sidebar/modals";
import { SideBarProps } from "@waldiez/components/sidebar/types";
import { AGENT_ICONS } from "@waldiez/theme";

export const SideBar = (props: SideBarProps) => {
    const { darkMode, onThemeToggle, typeShown, onTypeShownChange } = props;
    const {
        flowId,
        isCollapsed,
        isEditModalOpen,
        isImportModalOpen,
        onToggle,
        onExport,
        onShowAgents,
        onShowModels,
        onShowSkills,
        onUserDragStart,
        onAssistantDragStart,
        onManagerDragStart,
        onOpenEditModal,
        onCloseEditModal,
        onOpenImportModal,
        onCloseImportModal,
    } = useSideBar(props);
    return (
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`} data-testid={`sidebar-${flowId}`}>
            <div className="sidebar-header">
                {!isCollapsed && (
                    <div
                        role="button"
                        className="clickable"
                        data-testid={`edit-flow-${flowId}-sidebar-button`}
                        onClick={onOpenEditModal}
                        title="Edit flow"
                    >
                        <FaEdit /> <span>Edit flow</span>
                    </div>
                )}
                <div
                    className="sidebar-toggle"
                    onClick={onToggle}
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
                        onClick={onThemeToggle}
                        title="Toggle theme"
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
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

/*
<li
            id={`edit-flow-${flowId}-sidebar-button`}
            className="editor-nav-action clickable"
            data-testid={`edit-flow-${flowId}-sidebar-button`}
            onClick={onOpenEditModal}
            title="Edit flow"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <FaEdit /> Edit flow
              </div>
              <div className="sidebar-toggle">
                <FaBars
                  role="button"
                  className="sidebar-toggle-button tooltip-container clickable"
                  onClick={onToggle}
                  title={isCollapsed ? 'Open sidebar' : 'Close sidebar'}
                  aria-hidden="true"
                />
                {/* <div
                  role="button"
                  className={`sidebar-toggle-button tooltip-container clickable ${isCollapsed ? 'closed' : 'open'}`}
                  data-testid="sidebar-toggle"
                  title={isCollapsed ? 'Open sidebar' : 'Close sidebar'}
                  onClick={onToggle}
                >
                  <div></div>
                  <div></div>
                  <span className="tooltip">{isCollapsed ? 'Open sidebar' : 'Close sidebar'}</span>
                </div> 
                </div>
                </div>
              </li>
              */
