import React, { Dispatch, useState } from 'react';
import { connect } from 'react-redux';
import { TmainState, TACTIONS } from '../types';
import { ACTIONS } from '../store/actions/main';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface ISlider {
    wO: [string, string[]][];
    sT: boolean;
    sL: number;
    select: (e: number) => void;
}

const Slider: React.FC<ISlider> = ({ sT, wO, sL, select }) => {
    
    return (
        <div>
            {/* <div className={`relative bg-center bg-cover mx-auto my-2 img-transition rounded-lg`} style={{ backgroundImage: `url(${wO[sL][0]})`, height: "600px", width: "600px" }}>
    <p className={`text-xs bg-gray-900 text-gray-200 rounded-t-md`}>{wO[sL][1][0]}</p>                
            </div> */}
            <div className={`${sT ? 'bg-gray-900' : 'bg-gray-500'} p-4 rounded-lg`}>
            <div className={''} style={{height: '500px'}}>
            <TransitionGroup>
                <CSSTransition key={sL} timeout={500} classNames={'img-transition'} appear>
            <img className={`mx-auto rounded-lg`} width={500} src={wO[sL][0]}/>
                </CSSTransition>
            </TransitionGroup>
            </div>
            <div className={`w-auto inline-block p-2 rounded-full ${sT ? 'bg-gray-900' : 'bg-gray-500'}`}>
                    <div className={`flex flex-row p-1 justify-center`}>
                        {wO.map((e: any, i: number) => <div className={`cursor-pointer transform transition scale-90 duration-500
                        ${i === sL ? (sT ? 'bg-orange-700 scale-110' : 'bg-indigo-600 scale-110') : (sT ? 'bg-white' : 'bg-black')} rounded-full m-1 `} 
                        style={{ width: "25px", height: "25px" }} onClick={() => select(i)}></div>)}
                    </div>
                </div>
                </div>
        </div>
    )
}

const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        wO: t.works,
        sT: t.styleToggle,
        sL: t.selectedSlide,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TACTIONS>) => {
    return {
        select: (e: number) => dispatch({ type: ACTIONS.setSlide, payload: e })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider);