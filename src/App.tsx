import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Home from './_components/Home';
import darkLogo from './imgs/png/nightLogo.png';
import lightLogo from './imgs/png/dayLogo.png';
import { TmainState } from './types';
import FooterCred from './_components/FooterCred';
import AboutModal from './_components/AboutModal';
import NavMenu from './_components/NavMenu';
import Explore from './_components/Explore';
import { ACTIONS } from './store/actions/main';


interface IApp {
  location: {pathname: string};
  sT: boolean;
  rO: string[];
  aB: boolean;
  rN: string[];
  styleToggle: () => void;
  reLoad: (e: boolean) => void;
}
const App: React.FC<IApp> = ({ aB, sT, rO, styleToggle, reLoad }) => {
  const [wSize, setW] = useState(window.innerWidth);
  const resizeHandler = () => {
    setW(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  },[])
  const compMap: JSX.Element[] = [<Home wSize={wSize} />, <Explore />];
  const blurAbout: string = aB ? 'blur-effect overflow-hidden' : '';
  return (<>
    <div className={`w-max-screen subpixel-antialiased text-center p-4 select-none ${blurAbout}`}>
      <div className={`flex flex-row justify-center inline-block`}>
        <div>
        <img src={sT ? darkLogo : lightLogo} alt="logo praceholder" />
        </div>
        <label className="label px-2 mx-2">
                <div className="toggle">
                    <input className="toggle-state" type="checkbox" checked={!sT} onChange={() => {
                        styleToggle();
                        reLoad(false);}} />
                    <div className="toggle-inner">
                        <div className="indicator">
                        </div>
                    </div>
                    <div className="active-bg">
                    </div>
                </div>
            </label>
      </div>
      <NavMenu wSize={wSize}/>
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
    <div className={`${sT ? 'bg-dark' : 'bg-light'}`}></div>
    <AboutModal />
    <FooterCred />

  </>
  );
}

const mapStateToProps = (state: TmainState) => {
  const t = state;
  return {
    sT: t.styleToggle,
    rO: t.routes,
    aB: t.aboutState,
    rN: t.routeName,
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    styleToggle: () => dispatch({ type: ACTIONS.nightToggle }),
    reLoad: (e: boolean) => dispatch({ type: ACTIONS.setLoad, payload: e}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
