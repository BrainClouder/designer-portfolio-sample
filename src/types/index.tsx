import { nightToggle, selectArt, toggleAbout, clearView, setLoad, setStar } from "../store/actions/main"

export type TmainState = {
    routes: string[],
    routeName: string[],
    works: [string, string[]][],
    selectedArt: number,
    styleToggle: boolean,
    aboutState: boolean,
    loaded: boolean,
    starSeed: number[][],
}

type TselectedA = {type: typeof selectArt, payload: number};
type TnightT = {type: typeof nightToggle};
type TtoggleA = {type: typeof toggleAbout, payload: boolean};
type Tview = {type: typeof clearView};
type TsetLoad = {type: typeof setLoad, payload: boolean}
type TsetStar = {type: typeof setStar, payload: number[][]}






export type TACTIONS =  TtoggleA | TselectedA | TnightT | Tview | TsetLoad | TsetStar;