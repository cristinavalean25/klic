import React from "react";
import "./AgentInfo.css";
import { Agent } from "../types/Agent";

const AgentInfo: React.FC<{ agent: Agent; title: string }> = ({
  agent,
  title,
}) => (
  <div className="agent-info">
    <img src={agent.src} alt="Agent" className="agent-photo" />
    <div className="agent-details">
      <div style={{ textAlign: "center" }}>
        <h3 className="agent-title">{title}</h3>
      </div>
      <p className="agent-name">{agent.nume}</p>
      <p className="agent-email">
        <span
          style={{ cursor: "pointer" }}
          onClick={() => window.open(`mailto:${agent.email}`)}
        >
          {agent.email}
        </span>
      </p>
      <p className="agent-phone">
        <span
          style={{ cursor: "pointer", textAlign: "left" }}
          onClick={() => window.open(`tel:${agent.phone}`)}
        >
          {agent.phone}
        </span>
      </p>
    </div>
  </div>
);

export default AgentInfo;
