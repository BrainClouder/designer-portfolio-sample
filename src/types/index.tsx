import { nightToggle, selectArt, toggleAbout, clearView, setSlide } from "../store/actions/main"

export type TmainState = {
    routes: string[],
    routeName: string[],
    works: [string, string[]][],
    selectedArt: number,
    styleToggle: boolean,
    aboutState: boolean,
    selectedSlide: number,
}

type TselectedA = {type: typeof selectArt, payload: number};
type TnightT = {type: typeof nightToggle};
type TtoggleA = {type: typeof toggleAbout};
type Tview = {type: typeof clearView};
type TsetSlide = {type: typeof setSlide, payload: number}






export type TACTIONS =  TtoggleA | TselectedA | TnightT | Tview | TsetSlide;