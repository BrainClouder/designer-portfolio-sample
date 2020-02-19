import React, { Dispatch, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TmainState, TACTIONS } from '../types';
import { ACTIONS } from '../store/actions/main';

interface ISlider {
    wO: [string, string[]][];
    sT: boolean;
    sE: number;
    select: (e: number) => void;
}

const Slider: React.FC<ISlider> = ({ sT, wO, sE, select }) => {
    const [loading, setLoading] = useState(false);
    const [posY, setScroll] = useState(-1);
    const [feedY] = useState(() => wO.map((e: any) => Math.random() * 50));
    const [feedX] = useState(() => wO.map((e: any) => Math.floor(Math.random() * 80)));
    const [starS, setStar] = useState([[0, 0, 0]]);
    useEffect(() => {
        if (!loading) {
            window.addEventListener('scroll', scrollEventHandler);
            const star = [];
            window.scrollTo(0, 0);
            for (let i = 0; i < 100; i++) {
                star.push([Math.random(), Math.random(), Math.random()]);
            }
            setLoading(true);
            setStar(star);
        }
    });

    const scrollEventHandler = () => {
        setScroll(window.scrollY);
    }
    const linkStyle = `${sT ? 'text-orange-500 hover:text-orange-700' : 'text-indigo-500 hover:text-indigo-300'} font-bold`;
    const divHeight = wO.length * 100;
    const active = sE !== -1;
    const workName = active ? `"${[...wO[sE][1][0].split('"')][1]}"` : '';
    const authorName = active ? [...[...wO[sE][1][0].split('by')][1].split('is licensed')][0] : '';
    const license = active ? [...wO[sE][1][0].split('under ')][1] : '';
    return (<>
        <div className="relative">
            <div className={`fixed left-0 top-0 w-screen h-screen`} style={{ zIndex: -1 }}>
                {starS.map((e: number[], i: number) => {
                    return (
                        <div key={i + "a"} className="rounded-full" style={{
                            boxShadow: `0 0 5px ${sT ? 'white' : 'black'}`,
                            height: '3px', width: '3px', backgroundColor: sT ? 'white' : 'black', position: 'absolute',
                            transform: `scale(${(e[2] * 2) * 0.6 + 0.25})`, top: `${e[1] * divHeight - (((e[2] * 2) * posY) / 50)}px`, left: `${e[0] * 100}vw`
                        }}>

                        </div>
                    )
                })}
            </div>
            <div className="absolute left-0">
                <div className={`flex flex-wrap relative`} style={{ height: `${divHeight}px` }}>
                    {wO.map((e: any, i: number) => {
                        const parallFactor = (15 - 10 / i ^ 2);
                        const yCalc = (i + 1) * 100 + feedY[i] + ((posY / 100) * parallFactor);
                        const scaleFactor = (parallFactor / (2 * wO.length));
                        const active = sE === i;

                        return (
                            <div key={e[0]} onClick={() => {
                                window.scrollTo(0, 20);
                                select(i)
                            }} className={`rounded-full cursor-pointer bg-center bg-cover`} style={{
                                backgroundImage: active ? '' : `url(${e[0]})`,
                                height: active ? '' : '80px', width: active ? '' : '80px', position: 'absolute', top: `${yCalc}px`, left: `${feedX[i] + 5}vw`,
                                zIndex: scaleFactor > 0.35 || scaleFactor < -0.35 ? 1 : 0, transition: "500ms",
                                transform: `scale(${active ? 1 : ((scaleFactor < 0 ? -scaleFactor : scaleFactor) + 0.7)})`
                            }}>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
        <div className={`absolute left-0 w-screen`} style={{
            opacity: `${active ? 1 : 0}`, zIndex: 2, height: active ? '' : 0,
            transform: `scale(${active ? 1 : 0})`,
            transition: '500ms'

        }}>
            {active ? <div className={`flex flex-row justify-center`}>
                <div className={`w-1/3`} onClick={() => select(-1)}></div>
                <div className={`relative w-mylg shadow rounded-lg mx-auto ${sT ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>
                    <div className={`absolute`} style={{ right: '-15px', top: '-15px' }}>
                        <p className={`px-2 rounded-full py-1 border-2 cursor-pointer font-bold 
                                        ${sT ? 'bg-black border-black hover:bg-orange-700 hover:border-orange-600' :
                                'bg-white border-white hover:border-indigo-600 hover:bg-indigo-700 hover:text-white'} 
                                        w-auto inline-block`}
                            onClick={() => select(-1)}>X</p>
                    </div>
                    <img alt="art planet" src={wO[sE][0]} className={`border-4 rounded-t-lg ${sT ? 'border-gray-800' : 'border-gray-100'}`}></img>
                    <div className="text-xs p-2">
                        <a href={active ? wO[sE][1][1] : ''} className={linkStyle}>
                            {workName}
                        </a>
                        <a href={active ? wO[sE][1][2] : ''} className={linkStyle}>
                            {authorName}
                        </a> is licensed under <a href={active ? wO[sE][1][3] : ''} className={linkStyle}>
                            {license}
                        </a>
                    </div>
                </div>
                <div className={`w-1/3`} onClick={() => select(-1)}></div>
            </div> : ''}
        </div>
    </>
    )
}

const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        wO: t.works,
        sT: t.styleToggle,
        sE: t.selectedArt,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TACTIONS>) => {
    return {
        select: (e: number) => dispatch({ type: ACTIONS.selectArt, payload: e })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider);