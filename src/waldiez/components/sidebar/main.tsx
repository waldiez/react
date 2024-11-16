import { AiFillOpenAI } from 'react-icons/ai';
import { AiFillCode } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { FaFileExport, FaFileImport, FaMoon, FaRobot, FaSun } from 'react-icons/fa6';

import { useSideBar } from '@waldiez/components/sidebar/hooks';
import { EditFlowModal, ImportFlowModal } from '@waldiez/components/sidebar/modals';
import { SideBarProps } from '@waldiez/components/sidebar/types';
import { AGENT_ICONS } from '@waldiez/theme';

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
    onCloseImportModal
  } = useSideBar(props);
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} data-testid={`sidebar-${flowId}`}>
      <div className="sidebar-toggle">
        <div
          role="button"
          className={`sidebar-toggle-button tooltip-container clickable ${isCollapsed ? 'closed' : 'open'}`}
          data-testid="sidebar-toggle"
          onClick={onToggle}
        >
          <div></div>
          <div></div>
          <span className="tooltip">{isCollapsed ? 'Open sidebar' : 'Close sidebar'}</span>
        </div>
      </div>
      <div className="sidebar-content">
        <ul>
          <li
            role="button"
            id={`edit-flow-${flowId}-sidebar-button`}
            className="editor-nav-action clickable"
            data-testid={`edit-flow-${flowId}-sidebar-button`}
            onClick={onOpenEditModal}
            title="Edit flow"
          >
            <FaEdit /> Edit flow
          </li>
          <li
            role="button"
            className="clickable"
            data-node-type="agent"
            data-testid="show-agents"
            onClick={onShowAgents}
          >
            <FaRobot />
            Agents
          </li>
          <li
            role="button"
            className="clickable"
            data-node-type="model"
            data-testid="show-models"
            onClick={onShowModels}
          >
            <AiFillOpenAI />
            Models
          </li>
          <li
            role="button"
            className="clickable"
            data-node-type="skill"
            data-testid="show-skills"
            onClick={onShowSkills}
          >
            <AiFillCode />
            Skills
          </li>
        </ul>
        <div className="dnd-description">
          <p>Drag n' drop an agent to the canvas to add it to the flow</p>
        </div>
        <div className="dnd-area" data-testid="user-dnd" onDragStart={onUserDragStart} draggable>
          <img src={AGENT_ICONS.user} />
          User Proxy
        </div>
        <div className="dnd-area" data-testid="assistant-dnd" onDragStart={onAssistantDragStart} draggable>
          <img src={AGENT_ICONS.assistant} />
          Assistant
        </div>
        <div className="dnd-area" data-testid="manager-dnd" onDragStart={onManagerDragStart} draggable>
          <img src={AGENT_ICONS.manager} />
          Group Manager
        </div>
      </div>
      <div className="spacer"></div>
      <div className="sidebar-footer">
        <ul>
          <li
            role="button"
            className="clickable"
            onClick={onOpenImportModal}
            title="Import flow"
            data-testid={`import-flow-${flowId}-sidebar-button`}
          >
            <FaFileImport /> Import
          </li>
          <li
            role="button"
            className="clickable"
            onClick={onExport}
            title="Export flow"
            data-testid={`export-flow-${flowId}-sidebar-button`}
          >
            <FaFileExport /> Export
          </li>
          <li
            role="button"
            className="clickable"
            data-testid="theme-toggle"
            onClick={onThemeToggle}
            title="Toggle theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            <div className="clickable">{darkMode ? 'Light' : 'Dark'} mode</div>
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
