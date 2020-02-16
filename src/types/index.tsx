import { nightToggle, selectArt, toggleAbout } from "../store/actions/main"

export type TmainState = {
    routes: string[],
    works: [string, string[]][],
    selectedArt: number,
    styleToggle: boolean,
    aboutState: boolean
}

type selectedA = typeof selectArt;
type nightT = {type: typeof nightToggle};
type toggleA = {type: typeof toggleAbout};

type IselectedArt = {
    type: selectedA
    payload: number
}

export type TACTIONS =  toggleA | IselectedArt | nightT;