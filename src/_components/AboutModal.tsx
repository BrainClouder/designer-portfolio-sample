import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { TmainState, TACTIONS } from '../types';
import { ACTIONS } from '../store/actions/main';

interface IAbout {
    sT: boolean;
    aB: boolean;
    aboutToggle: (e: boolean) => void;
}


const AboutModal: React.FC<IAbout> = ({ sT, aB, aboutToggle }) => {

    const randomGen = Math.random() < 0.5;
    const profession = Math.random() > 0.5 ? (Math.random() > 0.5 ? (Math.random() > 0.5 ? (Math.random() > 0.5 ? 'UX/UI Designer 👓' : 'Photographer 📸') : 'Art Director 🖼') : 'Civil Architect 🏡') : 'Designer 🎨';
    const highLight: string = sT ? 'text-orange-400' : 'text-indigo-600';
    const randomLink: string = aB ? `https://randomuser.me/api/portraits/${randomGen ? 'men' : 'women'}/${Math.floor(Math.random() * 68 + 1)}.jpg` : '';
    const aboutVisible = aB ? 'visible' : 'invisible';

    // const mouseMoveHandler

    return (
        <>
            <div onClick={() => aboutToggle(false)} className={`fixed top-0 left-0 w-screen h-screen ${aboutVisible}`} style={{ transition: '1ms' }}></div>
            <div className={`absolute top-0 left-0 w-screen ${aboutVisible}`} style={{
                transform: `translate(${aB ? '' : '0, 40px'})`, transition: '200ms', opacity: `${aB ? '1' : '0'}`
            }}>
                <div className={`relative w-full w-max-screen flex flex-row justify-center m-4`}>
                    <div onClick={() => aboutToggle(false)} className={`w-1/4`}></div>
                    <div className={`mx-auto m-4 p-2 rounded-lg text-center w-mylg lg:w-mydisplay sm:w-mymd ${sT ? 'bg-gray-900 text-gray-200' : 'bg-gray-200'}`}>
                        <div className={`p-2 m-2`}>
                            <img alt="avatar" className={`rounded-full mx-auto p-2 shadow transform hover:scale-110 transition duration-200`} src={randomLink}></img>
                            <p className={`transform transition duration-500 hover:scale-110`}>{randomGen ? 'Joel Schrute' : 'Rachel van der Hopkins'}</p>
                            <p className={`font-bold transform transition duration-100 hover:scale-110 ${highLight}`}>{profession}</p>
                            <p className={`p-2 transform transition duration-200 hover:scale-110`}>something@email.com</p>
                            <p className={`p-2 transform transition duration-500 hover:scale-110`}>(000) XXXXX-XXXXX</p>
                            <p className={`p-2 transform transition duration-500 hover:scale-110`}>
                                No lies, I'm a proud {profession.toLowerCase()} Check out my most
                                recent works at this page! :)
                        </p>
                        </div>
                    </div>
                    <div onClick={() => aboutToggle(false)} className={`w-1/4`}></div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        sT: t.styleToggle,
        aB: t.aboutState,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TACTIONS>) => {
    return {
        aboutToggle: (e: boolean) => dispatch({ type: ACTIONS.toggleAbout, payload: e }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutModal);