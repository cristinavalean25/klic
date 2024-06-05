import React, { useEffect, useState } from "react";
import axios from "axios";
import { Agent } from "../types/Agent";

const ListaAgenti: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const agentId =
          "$2y$10$7RDBMR9Gc4G0M.2oWM3S2uFBuUJKdmmjo10Qrcoim.RXjXd13g/0K";
        const agentPassword =
          "$2y$10$Oc9YkDuKo9YKbCNayHrJbu8PiY9pA4dElWktPnoTAt5nh7emizaz6";
        const headers = {
          Authorization: `Basic ${btoa(`${agentId}:${agentPassword}`)}`,
        };

        const response = await axios.get("/api/sites/v1/agents", { headers });
        setAgents(response.data.data); // Adjusted to match the data structure
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  return (
    <>
      <div style={{ fontFamily: "SohneBreitHalbfett" }}>
        {agents.length > 0 ? (
          <ul>
            {agents.map((agent) => (
              <li key={agent.agentid}>
                <h2>{agent.nume}</h2>
                <p>Functie: {agent.functie?.ro}</p>{" "}
                {/* Adjusted to match the actual property */}
                {/* <p>Telefon: {agent.phone}</p> */}
                <p>Email: {agent.email}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No agents found</p>
        )}
      </div>
    </>
  );
};

export default ListaAgenti;
