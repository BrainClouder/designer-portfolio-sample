import React, { Dispatch } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Home from './_components/Home';
import { ACTIONS } from './store/actions/main';
import darkLogo from './imgs/png/nightLogo.png';
import lightLogo from './imgs/png/dayLogo.png';
import { TmainState, TACTIONS } from './types';
import FooterCred from './_components/FooterCred';

interface IApp {
  sT: boolean;
  rO: string[];
  aB: boolean;
  sE: boolean;
  styleToggle: () => void;
  aboutToggle: () => void;
}

const App: React.FC<IApp> = ({ aB, sE, sT, rO, styleToggle, aboutToggle }) => {
  const compMap = [<Home />]
  const randomGen = Math.random() < 0.5;
  const profession = Math.random() > 0.5 ? (Math.random() > 0.5 ? (Math.random() > 0.5 ? (Math.random() > 0.5 ? 'UX/UI Designer' : 'Photographer') : 'Art Director') : 'Civil Architect') : 'Designer';
  const highLight = sT ? 'text-orange-400' : 'text-indigo-600';
  const blurAbout = aB ? 'blur-effect' : '';
  const blurSelection = sE ? 'blur-effect' : '';
  const aboutStyle = sT ? 'text-gray-200 bg-black border-black hover:bg-orange-700 hover:border-orange-600' : 'text-gray-700 border-white bg-white hover:bg-indigo-700 hover:border-indigo-600';
  const randomLink = aB ? `https://randomuser.me/api/portraits/${randomGen ? 'men' : 'women'}/${Math.floor(Math.random() * 68 + 1)}.jpg` : '';
  return (<>
    <div className={`subpixel-antialiased text-center p-4 ${blurAbout}`}>
      <div className={`m-2 p-2 flex flex-row justify-around ${blurSelection}`}>
        <div>
          <button onClick={aboutToggle} className={`${aboutStyle}
            hover:text-white border-2 rounded-full px-4 transform transition duration-200 py-1 
            font-mono text-lg font-bold`}>About</button>
        </div>
        <div>
          <img src={sT ? darkLogo : lightLogo } />
        </div>
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
      </div>
      <div>
        <Switch>
          {rO.map((e: string, i: number) => <Route strict key={e} path={e} component={() => {
            const textDefaultStyle = sT ? 'text-gray-300' : 'text-gray-800';
            return (
              <div className={`${textDefaultStyle}`}>
                {compMap[i]}
              </div>)
          }
          } />)}
          <Route path={'/'} component={() => <Redirect to={rO[0]} />} />
        </Switch>
      </div>
      <div className="h-16">

      </div>
    </div>
    <FooterCred />

    <div className={`${sT ? 'bg-dark' : 'bg-light'}`}></div>
    <div onClick={aboutToggle} className={`fixed top-0 left-0 w-screen bg-black opacity-50 h-screen ${aB ? 'visible' : 'invisible'}`}></div>
    <div className={`absolute top-0 left-0 w-screen ${aB ? 'visible' : 'invisible'}`}>
      <div className={`relative w-full flex flex-row justify-center m-4`}>
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
  );
}

const mapStateToProps = (state: TmainState) => {
  const t = state;
  return {
    sT: t.styleToggle,
    rO: t.routes,
    aB: t.aboutState,
    sE: t.selectedArt !== -1,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<TACTIONS>) => {
  return {
    styleToggle: () => dispatch({ type: ACTIONS.nightToggle }),
    aboutToggle: () => dispatch({ type: ACTIONS.toggleAbout })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
