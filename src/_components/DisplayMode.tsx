import React from 'react';
import { connect } from 'react-redux';
import { TmainState } from '../types';
import { Parallax } from 'react-scroll-parallax';

interface IDisplay {
    sT: boolean;
    wO: [string, string[]][];
}

const DisplayMode: React.FC<IDisplay> = ({ sT, wO }) => {

    return (
        <div className={``}>
            {wO.map((e: [string, string[]], i: number) => <><div className={`relative border-gray-900 border-2 fixed-background`} style={{ backgroundImage: `url(${e[0]})` }}>
                    <p className={`bg-gray-900 w-auto inline-block px-2 py-1 rounded-b-lg text-gray-100`}>{e[1][0]}</p>
             </div>
                <div className={`relative`} style={{ height: "100px" }}>
                </div>
            </>)}
        </div>
    )
}

const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        sT: t.styleToggle,
        wO: t.works,
    }
}

export default connect(mapStateToProps)(DisplayMode);