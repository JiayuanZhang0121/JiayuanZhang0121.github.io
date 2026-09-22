// Adapted from arlagonix/half-life-screen/pages/HalfLifeScreen (MIT).
// Retains the background / heading / vertical menu / chosen window composition.
import { useEffect, useRef, useState } from 'react';
import classes from './index.module.scss';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Console from '../../components/Console';
import PageContent from '../../components/PageContent';
import { profile, routePath, routes, type Route } from '../../content';

const titles: Record<Route, string> = { home: 'Welcome to Personal Terminal', life: 'Life — Saved Records', study: 'Study — Knowledge Base', projects: 'Projects — Project Browser', about: 'About — Player Profile' };

export default function HalfLifeScreen() {
  const segment = window.location.pathname.replace(/\/index\.html$/, '').replace(/^\/|\/$/g, '');
  const route = (segment || 'home') as Route;
  const knownRoute = routes.includes(route);
  const [windowOpen, setWindowOpen] = useState(true);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const shell = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shell.current) shell.current.inert = consoleOpen;
  }, [consoleOpen]);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.isComposing || event.ctrlKey || event.altKey || event.metaKey || event.repeat) return;
      if (event.code === 'Backquote' || event.key === '~') {
        event.preventDefault();
        setConsoleOpen(open => !open);
      } else if (event.key === 'Escape') {
        if (consoleOpen) setConsoleOpen(false);
        else setWindowOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [consoleOpen]);

  return <>
    <div ref={shell}>
      <a className="skip-link" href="#page-content">Skip to content</a>
      <div className={classes.bgImage} aria-hidden="true">
        <div className={classes.wall} /><div className={classes.girder} /><div className={classes.door}><span>SECTOR 0121</span></div>
        <div className={classes.floor} /><div className={classes.texture} />
        <span className={classes.backgroundCaption}>PERSONAL ARCHIVE<br />ACCESS GRANTED</span>
      </div>
      <main className={classes.main}>
        <div className={classes.identity}><span className={classes.edition}>PERSONAL TERMINAL / BUILD 0121</span>
          <h1 className={classes.header}>JIAYUAN ZHANG</h1>
          <p className={classes.subtitle}>LIFE · STUDY · THINGS I BUILD</p>
        </div>
        <nav className={classes.nav} aria-label="Main menu">
          <ul className={classes.list}>
            {routes.map(tab => <li key={tab}><a href={routePath(tab)} aria-current={route === tab ? 'page' : undefined}>{tab.toUpperCase()}</a></li>)}
            <li><button type="button" onClick={() => setConsoleOpen(true)}>CONSOLE <span>~</span></button></li>
          </ul>
          <p className={classes.menuHint}>Select a module to continue.</p>
        </nav>
      </main>
      {windowOpen && <Modal header={knownRoute ? titles[route] : '404 — Record not found'} hasCloseIcon clickHandler={() => setWindowOpen(false)}>
        <div id="page-content" tabIndex={-1} className={classes.windowContent}>
          {knownRoute ? <PageContent route={route} /> : <div className={classes.notFound}><h3>That record does not exist.</h3><p>The address may have changed.</p><a href="/">Return to HOME</a></div>}
        </div>
        <div className={classes.windowFooter}><span>{knownRoute ? `${route.toUpperCase()} MODULE` : 'ERROR 404'} <span className={classes.dim}>/ 0121</span></span><div><Button clickHandler={() => setConsoleOpen(true)}>Console</Button><Button clickHandler={() => setWindowOpen(false)}>Close</Button></div></div>
      </Modal>}
      <footer className={classes.footer}><span>© 2026 {profile.name}<span className={classes.footerDivider}> / </span><a href={profile.github}>GitHub</a></span><span><i aria-hidden="true" />ONLINE<span className={classes.footerDivider}> / </span>build 0121</span></footer>
    </div>
    <Console open={consoleOpen} onClose={() => setConsoleOpen(false)} />
  </>;
}
