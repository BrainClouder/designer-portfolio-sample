import React from 'react';
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


interface IApp {
  location: {pathname: string};
  sT: boolean;
  rO: string[];
  aB: boolean;
  rN: string[];
}
const App: React.FC<IApp> = ({ aB, sT, rO, rN, location: {pathname} }) => {
  const compMap: JSX.Element[] = [<Home />, <Explore />];
  const blurAbout: string = aB ? 'blur-effect overflow-hidden' : '';
  return (<>
    <div className={`w-max-screen subpixel-antialiased text-center p-4 select-none ${blurAbout}`}>
      <div className={`w-screen`}>
        <img className={`mx-auto`} src={sT ? darkLogo : lightLogo} alt="logo praceholder" />
      </div>
      <NavMenu />
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

export default connect(mapStateToProps)(App);
