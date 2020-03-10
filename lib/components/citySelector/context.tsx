import { createContext} from "react";

interface MapContent {
    cityMap:{[key:string]:string[]},
    onChange:Function
}

export const C = createContext<MapContent>({cityMap:{},onChange:()=>{}});