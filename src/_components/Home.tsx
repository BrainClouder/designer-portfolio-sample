import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ACTIONS } from '../store/actions/main';

interface IHome {
    wSize: number;
    sT: boolean;
    wO: [string, string[]][];
    sE: number;
    select: (e: number) => void;
}

const Home: React.FC<IHome> = ({ sT, wO, sE, select, wSize }) => {
    const [loading, setLoad] = useState(false);
    if (!loading) {
        select(-1);
        setLoad(true);
    }

    const selProd = wO[sE];
    const isSelected = sE !== -1;
    const linkStyle = `${sT ? 'text-orange-500 hover:text-orange-700' : 'text-indigo-500 hover:text-indigo-300'} font-bold`;
    return (<>
        <div className={`absolute left-0 w-screen`} >
            <div className={`relative flex flex-wrap `} style={{ transform: 'rotate(0deg)' }}>
                {wO.map((e: any, i: number) => {
                    const active = sE === i;
                    const workName = `"${[...e[1][0].split('"')][1]}"`;
                    const authorName = [...[...e[1][0].split('by')][1].split('is licensed')][0];
                    const license = [...e[1][0].split('under ')][1];
                    return (
                        <div key={i + e[0]} onClick={() => select(i)} className={`w-screen ${wSize < 500 ? 'sm-gal' : 'md-gal'} ${active ? 'expanded-gallery' : 'base-gallery'} 
                            bg-center bg-cover bg-fixed relative`} style={{
                                backgroundImage: `url(${e[0]})`, transition: "500ms",
                                height: `${active ? 'auto' : ''}`
                            }}>
                            <div className={`absolute top-0 left-0 h-full w-full ${sT ? 'bg-white' : 'bg-black'} opacity-50`}></div>
                            <div className={`text-gray-900 flex flex-col justify-center`}
                                style={{ backgroundColor: `${active ? '' : '#000'}` }}>
                                <span className={active ? 'opacity-0' : 'opacity-100'}>+</span>
                                <div className={`${sT ? 'bg-gray-900 text-gray-200' : 'bg-gray-200'} modal-home-view mx-auto`}
                                    style={{
                                        transition: '500ms', opacity: `${active ? '0.96' : '0'}`,
                                        transform: `scale(${active ? '1' : '0.1'})`
                                    }}>
                                    <div className={`flex flex-col sm:flex-col md:flex-row `}>
                                        <img alt="img work" src={e[0]} className={`rounded-lg mx-auto border-8 my-4 ${sT ? 'border-gray-800' : 'border-gray-400'}`} 
                                            width={250} height={250} />
                                        <div className="px-2 py-1 w-full flex flex-col justify-center max-w-sm sm:max-w-sm md:max-w-lg">
                                            <h2 className="text-2xl">{workName}</h2>
                                            <p>I won't do lorem ipsum in this one. Instead, I'll type anything that is coming to my head right now just to fill up
                                            this text area so I can see if it fits right and feels right, so it can be used to input some text about some artwork
                                        Inside here will be a <span className={`${linkStyle} cursor-pointer`} onClick={() => window.scrollTo(0,0)}>
                                                    clicker</span> that will lead you to the top of the page.
                                            </p>
                                            <div className="text-xs p-2">
                                                <a href={isSelected ? selProd[1][1] : ''} className={linkStyle}>
                                                    {workName}
                                                </a>
                                                <a href={isSelected ? selProd[1][2] : ''} className={linkStyle}>
                                                    {authorName}
                                                </a> is licensed under <a href={isSelected ? selProd[1][3] : ''} className={linkStyle}>
                                                    {license}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);