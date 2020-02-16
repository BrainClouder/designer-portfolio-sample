import React from 'react';
import { connect } from 'react-redux';
import { ACTIONS } from '../store/actions/main';
import { NavLink as Nav } from 'react-router-dom';

interface IHome {
    sT: boolean;
    wO: string[];
    sE: number;
    select: (e: number) => void;
}

const Home: React.FC<IHome> = ({ sT, wO, sE, select }) => {
    const bgTog = (sT ? 'bg-gray-900 text-gray-300' : 'bg-gray-400 text-gray-700');
    const visibilityToggle = (sE !== -1 ? 'visible' : 'invisible');
    const selProd = wO[sE];
    const isSelected = sE !== -1;
    const workName = (isSelected ? `"${[...selProd[1][0].split('"')][1]}"` : '');
    const authorName = (isSelected ? [...[...selProd[1][0].split('by')][1].split('is licensed')][0] : '');
    const license = (isSelected ? [...selProd[1][0].split('under ')][1] : '');
    const linkStyle = `${sT ? 'text-orange-500 hover:text-orange-700' : 'text-indigo-500 hover:text-indigo-300'} font-bold cursor-pointer`;
    return (<>
        <div>
            <div className={`flex flex-wrap justify-center ${isSelected ? 'blur-effect':''}`}>
                {wO.map((e: any, i: number) => {
                    const onSelect = (sE === i ? `border-2 border-gray-800 scale-100 shadow ${bgTog}` : 'hover:scale-100');
                    const isVisible = (sE === i ? 'visible text-entering' : 'absolute invisible');
                    const btnSt = sT ? 'text-white hover:bg-white hover:text-gray-900' : 'text-gray-900 hover:bg-gray-900 hover:text-gray-300';
                    return (<div key={e[0]}
                        className={`w-mysm lg:w-mymd transform transition scale-95 duration-500 rounded-lg 
                        p-2 cursor-pointer m-1 ${onSelect}`}>
                        <img className="mx-auto w-mysm lg:w-mymd shadow rounded-sm" src={e[0]} onClick={() => select(i)} />
                        {/* <div className={`${bgTog} ${isVisible}`}>
                            <div className={`text-sm p-2 w-auto inline-block`} >
                                {e[1][0]}
                            </div>
                            <Nav to={`/work/${i}`} className={`transition duration-500 ${btnSt} 
                            font-bold px-2 py-1 transform rounded-full hover:scale-110`}>Learn more</Nav>
                        </div> */}
                    </div>)
                })}
            </div>
        </div>
        <div onClick={() => select(-1)} className={`bg-black fixed top-0 left-0 h-screen w-screen opacity-50 
        ${visibilityToggle}`}>

        </div>
        <div className={`${visibilityToggle} absolute top-0 left-0`}>
            <div className={`relative w-screen`}>
                <div className={`relative w-screen flex flex-row justify-center item-baseline`}>
                    <div className={'w-1/4'} onClick={() => select(-1)}></div>
                    <div className={`p-4`}>
                        <div>
                            <div className={`relative md:w-mydisplay w-mylg flex flex-col justify-center`}>
                                <img className={`w-full cursor-pointer shadow-inset rounded-t-lg`} src={isSelected ? selProd[0] : ''} onClick={() => select(-1)} />

                                <div className={`${sT ? 'bg-gray-900' : 'bg-gray-200'} shadow text-md p-2 rounded-b-lg`}>
                                    <p>
                                        <a href={isSelected ? selProd[1][1] : ''} className={linkStyle}>
                                            {workName}
                                        </a> by <a href={isSelected ? selProd[1][2] : ''} className={linkStyle}>
                                            {authorName}
                                        </a> is licensed under <a href={isSelected ? selProd[1][3] : ''} className={linkStyle}>
                                            {license}
                                        </a>
                                    </p>
                                    <p className={`p-1 m-1 font-bold text-3xl ${sT ? 'text-orange-600' : 'text-indigo-500'}`}>
                                        Work Title Here</p>
                                    <p className={`p-1 m-1`}>
                                        I won't do lorem ipsum in this one. Instead, I'll type anything that is coming to my head right now just to fill up
                                        this text area so I can see if it fits right and feels right, so it can be used to input some text about some artwork
                                        Inside here will be a <a className={linkStyle} href="#">link</a> that will lead you to the top of the page, other <a className={linkStyle} href={""}>link</a> that
                                        would refresh the page and a <a className={linkStyle} href={""}>link</a> that may take you out of here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'w-1/4'} onClick={() => select(-1)}></div>
                </div>
            </div>
        </div>
    </>
    )
}
const mapStateToProps = (state: any) => {
    const t = state;
    return {
        sT: t.styleToggle,
        wO: t.works,
        sE: t.selectedArt,
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        select: (e: number) => dispatch({ type: ACTIONS.selectArt, payload: e })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);