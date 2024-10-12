import React from "react";
import AgentInfo from "./AgentInfo";
import { Agent } from "../../types/Agent";

const AgentList: React.FC<{ agents: Agent[]; titles: string[] }> = ({
  agents,
  titles,
}) => (
  <div className="agent-list">
    {agents.map((agent, index) => (
      <AgentInfo key={index} agent={agent} title={titles[index]} />
    ))}
  </div>
);

export default AgentList;
