import { useEffect, useRef, useState } from 'react';
import { profile, routePath, routes, type Route } from '../content';
import Modal from './Modal';
import styles from './Console.module.scss';

const onPages = location.hostname.endsWith('.github.io');
const boot = [
  'Personal Terminal build 0121', '', 'Initializing modules...', '',
  `[OK] ${onPages ? 'GitHub Pages' : 'Local preview'} connected`,
  '[OK] Life module mounted', '[OK] Study module mounted', '[OK] Projects module mounted', '',
  '] status', '', `User: ${profile.name}`, 'Status: ONLINE', `Host: ${onPages ? 'GitHub Pages' : 'Local preview'}`, '',
  'Type help for available commands.',
];

export default function Console({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lines, setLines] = useState(boot);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const output = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    input.current?.focus();
    return () => { requestAnimationFrame(() => { if (previous?.isConnected) previous.focus(); }); };
  }, [open]);
  useEffect(() => {
    if (open && output.current) output.current.scrollTop = output.current.scrollHeight;
  }, [lines, open]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = command.trim();
    if (!text) return;
    const normalized = text.toLowerCase();
    setHistory(previous => [...previous, text].slice(-100));
    setHistoryIndex(-1);
    setCommand('');
    if (normalized === 'clear') { setLines([]); return; }
    let result: string[];
    if (normalized === 'help') result = ['Commands:', '  status           User and host information', '  home / life / study / projects / about', '                   Open a website module', '  github           Show GitHub profile URL', '  credits          Template attribution', '  clear            Clear console output', '  close / exit     Close console', '  ↑ / ↓            Command history'];
    else if (normalized === 'status') result = [`User: ${profile.name}`, 'Status: ONLINE', `Host: ${onPages ? 'GitHub Pages' : 'Local preview'}`];
    else if (normalized === 'github') result = [profile.github];
    else if (normalized === 'credits') result = ['UI: arlagonix/half-life-screen', 'Copyright (c) 2023 Alexander Gorbunov. MIT License.', 'https://github.com/arlagonix/half-life-screen', 'Personal website adaptation: Jiayuan Zhang'];
    else if (normalized === 'close' || normalized === 'exit') { result = ['Console closed.']; onClose(); }
    else if (routes.includes(normalized as Route)) { window.location.assign(routePath(normalized as Route)); result = [`Opening ${normalized}...`]; }
    else result = [`Unknown command: ${text}`, 'Type help for available commands.'];
    setLines(previous => [...previous, '', `] ${text}`, ...result].slice(-500));
  };

  if (!open) return null;
  return <div className={styles.overlay} onKeyDown={event => {
    if (event.key !== 'Tab') return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, input, a[href]');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }}>
    <Modal header="Developer Console" hasCloseIcon clickHandler={onClose} modal style={{ width: 'min(800px, 100%)' }}>
      <div ref={output} className={styles.output} role="log" aria-label="Console output" aria-live="polite">{lines.map((line, index) => <div key={index} className={line.startsWith(']') ? styles.command : undefined}>{line || '\u00a0'}</div>)}</div>
      <form onSubmit={submit} className={styles.form}><label htmlFor="console-command">]</label><input id="console-command" ref={input} aria-label="Console command" autoComplete="off" autoCapitalize="off" spellCheck={false} value={command} onChange={event => setCommand(event.target.value)} onKeyDown={event => {
        if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
        event.preventDefault();
        const next = event.key === 'ArrowUp' ? Math.min(historyIndex + 1, history.length - 1) : Math.max(historyIndex - 1, -1);
        setHistoryIndex(next);
        setCommand(next === -1 ? '' : history[history.length - 1 - next] || '');
      }} /><button type="submit">Submit</button></form>
      <p className={styles.hint}>~ toggle console · ESC close · ↑ ↓ history</p>
    </Modal>
  </div>;
}
