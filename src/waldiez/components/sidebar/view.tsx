import { AiFillOpenAI } from 'react-icons/ai';
import { AiFillCode } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { FaFileExport, FaFileImport, FaMoon, FaRobot, FaSun } from 'react-icons/fa6';

import { SideBarViewProps } from '@waldiez/components/sidebar/types';
import { AGENT_ICONS } from '@waldiez/theme';

export const SideBarView = (props: SideBarViewProps) => {
  const {
    flowId,
    darkMode,
    isCollapsed,
    onToggle,
    onEdit,
    onShowAgents,
    onShowModels,
    onShowSkills,
    onUserDragStart,
    onAssistantDragStart,
    onManagerDragStart,
    onImport,
    onExport,
    onThemeToggle
  } = props;
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
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
            className="editor-nav-action clickable"
            data-testid="edit-flow"
            onClick={onEdit}
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
          <li>
            <input
              type="file"
              data-testid={`import-flow-${flowId}`}
              id={`file-upload-flow-${flowId}`}
              className="hidden"
              accept=".waldiez"
              onChange={onImport}
            />
            <label
              htmlFor={`file-upload-flow-${flowId}`}
              className="clickable full-width file-label"
              title="Import a flow"
            >
              <FaFileImport />
              Import
            </label>
          </li>
          <li
            role="button"
            className="clickable"
            onClick={onExport}
            title="Export flow"
            data-testid={`export-flow-${flowId}`}
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
    </div>
  );
};
