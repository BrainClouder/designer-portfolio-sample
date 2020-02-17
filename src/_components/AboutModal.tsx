import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { TmainState, TACTIONS } from '../types';
import { ACTIONS } from '../store/actions/main';

interface IAbout {
    sT: boolean;
    aB: boolean;
    aboutToggle: () => void;
}


const AboutModal: React.FC<IAbout> = ({ sT, aB, aboutToggle }) => {

    const randomGen = Math.random() < 0.5;
    const profession = Math.random() > 0.5 ? (Math.random() > 0.5 ? (Math.random() > 0.5 ? (Math.random() > 0.5 ? 'UX/UI Designer' : 'Photographer') : 'Art Director') : 'Civil Architect') : 'Designer';
    const highLight: string = sT ? 'text-orange-400' : 'text-indigo-600';
    const randomLink: string = aB ? `https://randomuser.me/api/portraits/${randomGen ? 'men' : 'women'}/${Math.floor(Math.random() * 68 + 1)}.jpg` : '';
    const aboutVisible = aB ? 'visible modal-animate' : 'invisible';
    return (
        <>            
            <div onClick={aboutToggle} className={`fixed top-0 left-0 w-screen h-screen ${aboutVisible}`}></div>
            <div className={`absolute top-0 left-0 w-screen ${aboutVisible}`}>
                <div className={`relative w-full w-max-screen flex flex-row justify-center m-4`}>
                    <div onClick={aboutToggle} className={`w-1/4`}></div>
                    <div className={`mx-auto m-4 p-2 rounded-lg text-center w-mylg lg:w-mydisplay sm:w-mymd ${sT ? 'bg-gray-900 text-gray-200' : 'bg-gray-200'}`}>
                        <div className={`p-2 m-2`}>
                            <img className={`rounded-full mx-auto p-2 shadow transform hover:scale-110 transition duration-200`} src={randomLink}></img>
                            <p>{randomGen ? 'Mendonza Schrute' : 'Rachel van der Hopkins'}</p>
                            <p className={`font-bold ${highLight}`}>{profession}</p>
                            <p>something@email.com</p>
                            <p>
                                No lies, I'm a proud {profession.toLowerCase()}. Check out my most
                                recent works at this page. Talk to me if you interesting in hiring me!
            </p>
                        </div>
                    </div>
                    <div onClick={aboutToggle} className={`w-1/4`}></div>
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
        aboutToggle: () => dispatch({ type: ACTIONS.toggleAbout }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutModal);