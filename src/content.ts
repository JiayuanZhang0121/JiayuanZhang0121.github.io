export const profile = {
  name: 'Jiayuan Zhang',
  role: 'Student / Developer',
  intro: '你好，我是 Jiayuan。这里存放我的学习记录、项目，以及生活中值得记住的片段。',
  interests: 'AI / Machine Learning, Computer Systems, Games, Life',
  languages: '中文 / English',
  github: 'https://github.com/JiayuanZhang0121',
  email: '', // Set a public email address to enable the contact link.
  cv: '', // e.g. /cv.pdf after adding public/cv.pdf.
};

export const routes = ['home', 'life', 'study', 'projects', 'about'] as const;
export type Route = typeof routes[number];
export const routePath = (route: Route) => route === 'home' ? '/' : `/${route}/`;

export const activity = [
  { date: '2026.09.16', title: '个人终端更新', text: '把个人主页装进熟悉的老式菜单系统。', route: 'projects' as Route },
  { date: '2026.09', title: 'Study log initialized', text: '把长期学习内容拆成小块记录。', route: 'study' as Route },
  { date: '2026.09', title: 'Life archive mounted', text: '给日常、旅行和照片留一个位置。', route: 'life' as Route },
];

export const lifeCategories = ['全部记录', '日常', '旅行', '照片', '游戏 / 电影', 'Archive'];
export const lifeEntries = [
  {
    id: 'log-001', date: '2026.09.16', category: '日常', title: '网站上线',
    summary: '从一个简单的页面开始，给生活留一点存档空间。',
    body: '今天把自己的 GitHub Pages 小站搭起来了。先从一个简单的页面开始，之后慢慢往里面塞照片、旅行、日常和一些奇怪的想法。',
  },
];

export const studyTopics = [
  { name: 'AI / Machine Learning', code: '01', status: 'ACTIVE', summary: '课程笔记、论文阅读、实验记录和踩坑清单。', detail: '记录模型、训练过程与实验结果。先理解问题，再记录假设、实现和复盘。', tags: 'Python / PyTorch / ML' },
  { name: 'Computer Systems', code: '02', status: 'ACTIVE', summary: '操作系统、网络、Linux 与工具链。', detail: '记录环境配置、系统行为与调试过程。把复现步骤和解决方法一起存下来。', tags: 'Linux / Systems / Networking' },
];
export const studyTasks = ['阅读一篇论文并整理问题与方法', '复现一个 baseline，记录实验设置', '整理学习笔记与调试记录'];

export type ProjectStatus = 'ONLINE' | 'WIP' | 'ARCHIVED';
export const projects: { name: string; status: ProjectStatus; stack: string; description: string; url: string }[] = [
  { name: 'Personal Terminal', status: 'ONLINE', stack: 'React / TypeScript / SCSS / Vite', description: '这个个人网站。基于 arlagonix/half-life-screen 的菜单与窗口实现，存放生活、学习和项目记录。', url: 'https://github.com/JiayuanZhang0121/JiayuanZhang0121.github.io' },
];
