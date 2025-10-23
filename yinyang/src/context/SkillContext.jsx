import {createContext,useState,useContext} from "react";
import {dummySkills} from "../data/dummySkills";
import { use } from "react";

const SkillContext = createContext();

export function SkillProvider({children}){
    const [skills,setSkills] = useState(dummySkills);
    const addSkill = (newSkill) =>{
        setSkills((prevSkills) =>[...prevSkills,{id: prevSkills.length + 1, ...newSkill}])
    };
    return(
        <SkillContext.Provider value={{ skills, addSkill}}>
            {children}
        </SkillContext.Provider>
    );
}
export function useSkills(){
    return useContext(SkillContext);
}