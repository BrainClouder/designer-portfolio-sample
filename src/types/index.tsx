import { nightToggle, selectArt, toggleAbout, clearView } from "../store/actions/main"

export type TmainState = {
    routes: string[],
    works: [string, string[]][],
    selectedArt: number,
    styleToggle: boolean,
    aboutState: boolean,
}

type TselectedA = {type: typeof selectArt, payload: number};
type TnightT = {type: typeof nightToggle};
type TtoggleA = {type: typeof toggleAbout};
type Tview = {type: typeof clearView};






export type TACTIONS =  TtoggleA | TselectedA | TnightT | Tview;