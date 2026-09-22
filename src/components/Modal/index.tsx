// Adapted from arlagonix/half-life-screen (MIT). See THIRD_PARTY_NOTICES.md.
import { useEffect, useId, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import classes from './index.module.scss';

interface ModalProps {
  header: string;
  children?: React.ReactNode;
  hasCloseIcon?: boolean;
  style?: React.CSSProperties;
  clickHandler?: () => void;
  modal?: boolean;
}

const Modal: React.FC<ModalProps> = ({ header, children, hasCloseIcon = false, style, clickHandler, modal = false }) => {
  const nodeRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const resetPosition = () => setPosition({ x: 0, y: 0 });
    window.addEventListener('resize', resetPosition);
    return () => window.removeEventListener('resize', resetPosition);
  }, []);
  return (
    <div className={classes.stage} data-modal={modal || undefined}>
      <Draggable nodeRef={nodeRef} handle=".window-drag-handle" cancel="button" bounds="parent" position={position} onStop={(_, data) => setPosition({ x: data.x, y: data.y })}>
        <section ref={nodeRef} role="dialog" aria-modal={modal || undefined} aria-labelledby={titleId} className={classes.wrapper} style={style}>
          <div className={`window-drag-handle ${classes.titlebar}`}>
            <h2 id={titleId} className={classes.header}><span className={classes.windowIcon} aria-hidden="true" />{header}</h2>
            {hasCloseIcon && <button type="button" onClick={clickHandler} className={classes.closeButton} aria-label={`Close ${header}`}><span aria-hidden="true">×</span></button>}
          </div>
          {children}
        </section>
      </Draggable>
    </div>
  );
};
export default Modal;
