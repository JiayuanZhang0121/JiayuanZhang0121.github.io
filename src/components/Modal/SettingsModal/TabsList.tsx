// Generalized from the upstream Graphics/Audio tabs; bevel styles retained.
import clsx from 'clsx';
import classes from './index.module.scss';

interface TabsListProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  label: string;
}
export default function TabsList({ tabs, activeTab, setActiveTab, label }: TabsListProps) {
  return <header className={classes.tabList} aria-label={label}>
    {tabs.map(tab => <button type="button" key={tab} className={clsx(classes.tab, activeTab === tab && classes.active)} aria-pressed={activeTab === tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}
  </header>;
}
