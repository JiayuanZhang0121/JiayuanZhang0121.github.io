import { useState } from 'react';
import { activity, lifeCategories, lifeEntries, profile, projects, routePath, studyTasks, studyTopics, type Route } from '../content';
import Button from './Button';
import TabsList from './Modal/SettingsModal/TabsList';
import modal from './Modal/index.module.scss';
import styles from './PageContent.module.scss';

function Home() {
  return <div className={styles.column}>
    <div className={styles.sectionLabel}>MESSAGE OF THE DAY</div>
    <section className={`${modal.blackBox} ${styles.welcome}`}><p className={styles.eyebrow}>Hello, world.</p><h3>{profile.name}</h3><p>{profile.intro}</p><span className={styles.muted}>Student / Developer · 中文 / English</span></section>
    <fieldset><legend>最近动态 / Recent activity</legend><div className={styles.logList}>{activity.map(item => <a href={routePath(item.route)} key={item.title} className={styles.logRow}><time>{item.date}</time><div><strong>{item.title}</strong><p>{item.text}</p></div><span aria-hidden="true">›</span></a>)}</div></fieldset>
    <fieldset><legend>网站状态 / System status</legend><dl className={styles.status}><dt>Status</dt><dd className={styles.online}>● ONLINE</dd><dt>Host</dt><dd>GitHub Pages</dd><dt>Modules</dt><dd>LIFE / STUDY / PROJECTS</dd><dt>Build</dt><dd>0121</dd></dl></fieldset>
    <p className={styles.hint}>从左侧菜单选择模块。按 <kbd>~</kbd> 打开 Developer Console。</p>
  </div>;
}

function Life() {
  const [category, setCategory] = useState(lifeCategories[0]);
  const [reading, setReading] = useState<string | null>(null);
  const entries = lifeEntries.filter(entry => category === '全部记录' || category === 'Archive' || entry.category === category);
  const entry = lifeEntries.find(item => item.id === reading);
  return <div className={styles.column}>
    <p className={styles.description}>日常、旅行、照片，以及游戏和电影。给生活留一点存档空间。</p>
    <TabsList label="Life categories" tabs={lifeCategories} activeTab={category} setActiveTab={value => { setCategory(value); setReading(null); }} />
    <div className={`${modal.blackBox} ${styles.archive}`}>
      {entry ? <article className={styles.article}><span className={styles.muted}>{entry.date} / {entry.id}</span><h3>{entry.title}</h3><p>{entry.body}</p><Button clickHandler={() => setReading(null)}>Back to archive</Button></article> : <>
        <div className={styles.sectionLabel}>{category === 'Archive' ? '2026 / SEPTEMBER' : `${category} / SAVED RECORDS`}</div>
        {entries.map(item => <button className={styles.record} key={item.id} onClick={() => setReading(item.id)}><span className={styles.recordIcon} aria-hidden="true">01</span><span><span className={styles.muted}>{item.date} / {item.category}</span><strong>{item.title}</strong><span>{item.summary}</span></span><span aria-hidden="true">›</span></button>)}
        {entries.length === 0 && <div className={styles.empty}><span className={styles.emptySymbol} aria-hidden="true">[ — ]</span><h3>暂无{category}记录</h3><p>这个存档位还空着，之后慢慢填满。</p></div>}
      </>}
    </div><p className={styles.hint}>{entries.length} record(s) found. {category === '照片' ? '照片尚未上传。' : '选择记录查看全文。'}</p>
  </div>;
}

function Study() {
  const [tab, setTab] = useState('学习记录');
  const [topic, setTopic] = useState(0);
  const [checked, setChecked] = useState<number[]>([]);
  return <div className={styles.column}>
    <p className={styles.description}>学习记录、论文阅读与实验笔记。</p>
    <TabsList label="Study sections" tabs={['学习记录', '论文阅读', '当前任务']} activeTab={tab} setActiveTab={setTab} />
    {tab === '学习记录' && <><div className={modal.blackBox}>{studyTopics.map((item, index) => <button key={item.code} className={styles.topic} aria-pressed={topic === index} onClick={() => setTopic(index)}><span className={styles.topicCode}>{item.code}</span><span><strong>{item.name}</strong><span>{item.summary}</span></span><span className={styles.online}>{item.status}</span></button>)}</div><fieldset><legend>{studyTopics[topic].name}</legend><p>{studyTopics[topic].detail}</p><p className={styles.tech}>{studyTopics[topic].tags}</p></fieldset></>}
    {tab === '论文阅读' && <div className={`${modal.blackBox} ${styles.archive}`}><div className={styles.sectionLabel}>PAPER READING / INDEX</div><div className={styles.empty}><span className={styles.emptySymbol} aria-hidden="true">[ PDF ]</span><h3>论文阅读记录整理中</h3><p>这里将记录问题、方法、实验与自己的理解。</p></div></div>}
    {tab === '当前任务' && <fieldset className={styles.taskList}><legend>Current learning queue</legend><p className={styles.muted}>本次会话的学习清单</p>{studyTasks.map((task, index) => <label key={task}><input type="checkbox" checked={checked.includes(index)} onChange={() => setChecked(current => current.includes(index) ? current.filter(i => i !== index) : [...current, index])} /><span>{task}</span></label>)}<p className={styles.tech}>{checked.length} / {studyTasks.length} completed</p></fieldset>}
    <p className={styles.hint}>Read. Build. Write it down.</p>
  </div>;
}

function Projects() {
  const [status, setStatus] = useState('ALL');
  const visibleProjects = projects.filter(project => status === 'ALL' || project.status === status);
  return <div className={styles.column}>
    <p className={styles.description}>正在做、做完和归档的项目。</p>
    <TabsList label="Project status" tabs={['ALL', 'ONLINE', 'WIP', 'ARCHIVED']} activeTab={status} setActiveTab={setStatus} />
    <div className={`${modal.blackBox} ${styles.projectList}`}><div className={styles.tableHeader}><span>PROJECT / DESCRIPTION</span><span>STATUS</span></div>
      {visibleProjects.map(project => <article className={styles.project} key={project.url}><header><h3>{project.name}</h3><span className={styles.online}>{project.status}</span></header><p>{project.description}</p><dl><dt>Tech stack</dt><dd>{project.stack}</dd></dl><a href={project.url}>Open on GitHub ↗</a></article>)}
      {visibleProjects.length === 0 && <div className={styles.empty}><h3>No {status.toLowerCase()} projects</h3><p>此分类下暂无公开项目。</p></div>}
    </div><p className={styles.hint}>{visibleProjects.length} project(s) listed. <a href={`${profile.github}?tab=repositories`}>Browse GitHub repositories ↗</a></p>
  </div>;
}

function About() {
  return <div className={styles.column}>
    <div className={styles.profileHeading}><div className={styles.avatar} aria-hidden="true">JZ<span>0121</span></div><div><span className={styles.sectionLabel}>PLAYER PROFILE</span><h3>{profile.name}</h3><p>{profile.role}</p><span className={styles.online}>● ONLINE</span></div></div>
    <fieldset><legend>Profile data</legend><dl className={styles.profile}><dt>Name</dt><dd>{profile.name}</dd><dt>Role</dt><dd>{profile.role}</dd><dt>Interests</dt><dd>{profile.interests}</dd><dt>Languages</dt><dd>{profile.languages}</dd><dt>GitHub</dt><dd><a href={profile.github}>@JiayuanZhang0121 ↗</a></dd><dt>Email</dt><dd>{profile.email ? <a href={`mailto:${profile.email}`}>{profile.email}</a> : <span className={styles.muted}>暂未公开 / Not public</span>}</dd><dt>CV</dt><dd>{profile.cv ? <a href={profile.cv}>Download CV</a> : <span className={styles.muted}>暂未发布 / Not published</span>}</dd></dl></fieldset>
    <div className={modal.blackBox}><p>{profile.intro}</p><p className={styles.muted}>Keep it simple. Keep it personal.</p></div>
    <p className={styles.credits}>UI adapted from <a href="https://github.com/arlagonix/half-life-screen">arlagonix/half-life-screen</a><br />© 2023 Alexander Gorbunov · <a href="/licenses/half-life-screen-MIT.txt">MIT License</a> · <a href="/THIRD_PARTY_NOTICES.md">Third-party notices</a></p>
  </div>;
}

export default function PageContent({ route }: { route: Route }) {
  switch (route) { case 'home': return <Home />; case 'life': return <Life />; case 'study': return <Study />; case 'projects': return <Projects />; case 'about': return <About />; }
}
