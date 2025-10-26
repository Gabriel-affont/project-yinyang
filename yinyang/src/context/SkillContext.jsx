import { createContext, useContext, useEffect, useState } from "react";
import { dummySkills } from "../data/dummySkills";

const SkillContext = createContext();

export function SkillProvider({ children }) {
  const [skills, setSkills] = useState(() => {
    const stored = localStorage.getItem("skills");
    return stored ? JSON.parse(stored) : dummySkills;
  });

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  const addSkill = (newSkill) => {
    setSkills((prev) => [...prev, { id: prev.length + 1, ...newSkill }]);
  };

  // New function to handle requests
  const requestSkill = (id, requesterEmail) => {
    setSkills((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, requestedBy: requesterEmail, status: "requested" }
          : s
      )
    );
  };

  // Owner can approve, decline, or mark as completed
  const updateSkillStatus = (id, status) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  return (
    <SkillContext.Provider
      value={{ skills, addSkill, requestSkill, updateSkillStatus }}
    >
      {children}
    </SkillContext.Provider>
  );
}

export function useSkills() {
  return useContext(SkillContext);
}
