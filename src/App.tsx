import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Home from './_components/Home';
import { TmainState } from './types';
import FooterCred from './_components/FooterCred';
import AboutModal from './_components/AboutModal';
import NavMenu from './_components/NavMenu';

interface IApp {
  sT: boolean;
  rO: string[];
  aB: boolean;
}

const App: React.FC<IApp> = ({ aB, sT, rO }) => {
  const compMap: JSX.Element[] = [<Home />];
  const blurAbout: string = aB ? 'blur-effect' : '';
  return (<>
    <div className={`w-max-screen subpixel-antialiased text-center p-4 ${blurAbout}`}>
      <NavMenu/>
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
  }
}

export default connect(mapStateToProps)(App);
