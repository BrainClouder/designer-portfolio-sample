import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Home from './_components/Home';
import { ACTIONS } from './store/actions/main';
import gitDark from './imgs/png/gitHubDark.png';
import gitLight from './imgs/png/gitHubLight.png';
import soLogo from './imgs/svg/so-icon.svg';
import lnLogo from './imgs/png/lnIcon.png';

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
  return (<>
    <div className={`subpixel-antialiased text-center ${aB ? 'blur-effect' : ''}`}>
      <div className={`m-2 p-2 flex flex-row justify-around ${sE ? 'blur-effect' : ''}`}>
        <div>
          <button onClick={aboutToggle} className={`${sT ? 'text-gray-500 border-gray-800 hover:bg-orange-700' : 'text-gray-700 border-gray-400 hover:bg-indigo-700'} 
            hover:text-white border-2 rounded-full px-4 transform transition duration-200 py-1 
            font-mono text-lg font-bold`}>About</button>
        </div>
        <div>
          <p className={`${highLight} ${sT ? 'logo-effect-dark' : 'logo-effect-light'} font-bold logo-effect`}>can_be_your_logo.com</p>
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

      </div>
      <div>
        <Switch>
          {rO.map((e: string, i: number) => <Route strict key={e} path={e} component={() => {
            return (
              <div className={`${sT ? 'text-gray-300' : 'text-gray-700'}`}>
                {compMap[i]}
              </div>)
          }
          } />)}
          <Route path={'/'} component={() => <Redirect to={rO[0]} />} />
        </Switch>
      </div>
    </div>

    <div className={`fixed bottom-0 left-0 w-screen`}>
      <div className={`relative mx-auto w-screen text-left`}>
        <div className={`${sT ? 'bg-gray-900' : 'bg-gray-200 shadow-inner'} w-auto inline-block px-2 py-2 m-4 rounded-md`}>
          <div className={`flex flex-col`}>
            <div className="p-2 transition duration-200 transform hover:scale-125">
              <a href={'https://github.com/BrainClouder'}><img src={sT ? gitLight : gitDark} /></a>
            </div>
            <div className="p-2 transition duration-200 transform hover:scale-125">
              <a href={'https://stackoverflow.com/users/11518214/celso-wellington'}><img src={soLogo} width={32}/></a>
            </div>
            <div className="p-2 transition duration-200 transform hover:scale-125">
              <a href={'https://www.linkedin.com/in/contrateme/'}><img src={lnLogo} width={32}/></a>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div className={`${sT ? 'bg-dark' : 'bg-light'}`}></div>
    <div onClick={aboutToggle} className={`fixed top-0 left-0 w-screen bg-black opacity-50 h-screen ${aB ? 'visible' : 'invisible'}`}></div>
    <div className={`absolute top-0 left-0 w-screen ${aB ? 'visible' : 'invisible'}`}>
      <div className={`relative w-full flex flex-row justify-center m-4`}>
        <div onClick={aboutToggle} className={`w-1/4`}></div>
        <div className={`mx-auto m-4 p-2 rounded-lg text-center w-mylg lg:w-mydisplay sm:w-mymd ${sT ? 'bg-gray-900 text-gray-200' : 'bg-gray-200'}`}>
          <div className={`p-2 m-2`}>
            <img className={`rounded-full mx-auto p-2 shadow`} src={`https://randomuser.me/api/portraits/${randomGen ? 'men' : 'women'}/${Math.floor(Math.random() * 68 + 1)}.jpg`}></img>
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

const mapStateToProps = (state: any) => {
  const t = state;
  return {
    sT: t.styleToggle,
    rO: t.routes,
    aB: t.aboutState,
    sE: t.selectedArt !== -1,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    styleToggle: () => dispatch({ type: ACTIONS.nightToggle }),
    aboutToggle: () => dispatch({ type: ACTIONS.toggleAbout })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
