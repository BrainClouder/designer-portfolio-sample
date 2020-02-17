import React from 'react';
import { connect } from 'react-redux';
import { ACTIONS } from '../store/actions/main';

interface IHome {
    sT: boolean;
    wO: string[];
    sE: number;
    select: (e: number) => void;
    clear: () => void;
}

const Home: React.FC<IHome> = ({ sT, wO, sE, select, clear }) => {
    const bgTog = (sT ? 'bg-gray-900 text-gray-300' : 'bg-gray-400 text-gray-700');
    const visibilityToggle = (sE !== -1 ? 'visible modal-animate' : 'invisible');
    const selProd = wO[sE];
    const isSelected = sE !== -1;
    const workName = (isSelected ? `"${[...selProd[1][0].split('"')][1]}"` : '');
    const authorName = (isSelected ? [...[...selProd[1][0].split('by')][1].split('is licensed')][0] : '');
    const license = (isSelected ? [...selProd[1][0].split('under ')][1] : '');
    const linkStyle = `${sT ? 'text-orange-500 hover:text-orange-700' : 'text-indigo-500 hover:text-indigo-300'} font-bold`;
    const blurSelected = isSelected ? 'blur-effect' : '';
    return (<>
        <div>
            <div className={`flex flex-wrap justify-center ${blurSelected}`}>
                {wO.map((e: any, i: number) => {
                    const onSelect = (sE === i ? `border-2 border-gray-800 scale-100 shadow ${bgTog}` : 'hover:scale-100');
                    return (<div key={e[0]}
                        className={`w-mymd transform transition scale-95 duration-500 rounded-lg 
                        md:p-2 cursor-pointer m-1 ${onSelect}`}>
                        <img className="shadow rounded-sm" src={e[0]} onClick={() => {
                            window.scrollTo(0,0);
                            select(i);
                        }} />
                    </div>)
                })}
            </div>
        </div>
        <div onClick={clear} className={`fixed top-0 left-0 h-screen w-screen ${visibilityToggle}`}>

        </div>
        <div className={`${visibilityToggle} absolute top-0 left-0`}>
            <div className={`relative w-screen`}>
                <div className={`relative w-screen flex flex-row justify-center item-baseline`}>
                    <div className={'w-1/4'} onClick={clear}></div>
                    <div className={`p-4`}>
                        <div>
                            <div className={`relative md:w-mydisplay w-mylg flex flex-col justify-center`}>
                                <img className={`w-full cursor-pointer shadow-inset rounded-t-lg`} src={isSelected ? selProd[0] : ''} onClick={clear} />
                                <div className={`${sT ? 'bg-gray-900' : 'bg-gray-400'} shadow text-md p-2 rounded-b-lg`}>
                                    <p>
                                        <a href={isSelected ? selProd[1][1] : ''} className={linkStyle}>
                                            {workName}
                                        </a> by <a href={isSelected ? selProd[1][2] : ''} className={linkStyle}>
                                            {authorName}
                                        </a> is licensed under <a href={isSelected ? selProd[1][3] : ''} className={linkStyle}>
                                            {license}
                                        </a>
                                    </p>
                                    <p className={`p-1 m-1 font-bold text-3xl ${linkStyle}`}>
                                        Work Title Here</p>
                                    <p className={`p-1 m-1`}>
                                        I won't do lorem ipsum in this one. Instead, I'll type anything that is coming to my head right now just to fill up
                                        this text area so I can see if it fits right and feels right, so it can be used to input some text about some artwork
                                        Inside here will be a <a className={`${linkStyle} cursor-pointer`} href="#">link</a> that will lead you to the top of the page, other <a className={`${linkStyle} cursor-pointer`} href={""}>link</a> that
                                        would refresh the page and a <a className={`${linkStyle} cursor-pointer`} href={""}>link</a> that may take you out of here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'w-1/4'} onClick={clear}></div>
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
        select: (e: number) => dispatch({ type: ACTIONS.selectArt, payload: e }),
        clear: () => dispatch({ type: ACTIONS.clearView }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);