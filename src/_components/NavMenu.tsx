import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { TmainState, TACTIONS } from '../types';
import { ACTIONS } from '../store/actions/main';
import { NavLink as Nav } from 'react-router-dom';

interface INav {
    sT: boolean;
    aB: boolean;
    sE: boolean;
    rO: string[];
    rN: string[];
    styleToggle: () => void;
    aboutToggle: () => void;

}

const NavMenu: React.FC<INav> = ({ sT, aB, sE, styleToggle, aboutToggle, rN, rO }) => {
    const blurSelection = sE ? 'blur-effect' : '';
    const aboutButton = (sT ? 'text-gray-200 bg-black border-black hover:bg-orange-700 hover:border-orange-600' : 
    'text-gray-700 border-white bg-white hover:bg-indigo-700 hover:border-indigo-600') + `hover:text-white border-2 rounded-full px-4 transform transition duration-200 py-1 
    font-mono text-lg font-bold`;

    return (
        <div className={`m-2 p-2 flex flex-row justify-around ${blurSelection}`}>

            <button onClick={aboutToggle} className={`${aboutButton}`}>About</button>

{rN.map((e: string, i: number) => <Nav className={`${aboutButton} `} to={rO[i]}>{e}</Nav>)}

        <label className="label">
            <div className="toggle">
                <input className="toggle-state" type="checkbox" checked={!sT} onChange={styleToggle} />
                <div className="toggle-inner">
                    <div className="indicator">
                    </div>
                </div>
                <div className="active-bg">
                </div>
            </div>
        </label>
        </div >
    )
}
const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        sT: t.styleToggle,
        aB: t.aboutState,
        sE: t.selectedArt !== -1,
        rO: t.routes,
        rN: t.routeName,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TACTIONS>) => {
    return {
        styleToggle: () => dispatch({ type: ACTIONS.nightToggle }),
        aboutToggle: () => dispatch({ type: ACTIONS.toggleAbout })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);