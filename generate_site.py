"""Generate the English and Chinese static pages for GitHub Pages."""

from pathlib import Path

ROOT = Path(__file__).parent
ROUTES = ("home", "study", "projects", "life", "about")
LABELS = {
    "en": ("Home", "Study", "Projects", "Life", "About"),
    "zh": ("首页", "学习", "项目", "生活", "关于"),
}
TITLES = {
    "en": ("Home", "Study", "Projects", "Life", "About"),
    "zh": ("首页", "学习", "项目", "生活", "关于"),
}
SCORE_BLOCKS = {
    "en": '''      <section aria-labelledby="toefl-title">
        <h2 id="toefl-title">TOEFL iBT</h2>
        <p class="meta">Tested Jul 19, 2026 · Result received Jul 23, 2026 · Scores on the 1–6 scale</p>
        <table class="score-table">
          <thead><tr><th scope="col">Section</th><th scope="col">Score</th></tr></thead>
          <tbody>
            <tr><th scope="row">Reading</th><td>5.0</td></tr>
            <tr><th scope="row">Listening</th><td>5.5</td></tr>
            <tr><th scope="row">Speaking</th><td>5.5</td></tr>
            <tr><th scope="row">Writing</th><td>6.0</td></tr>
          </tbody>
          <tfoot><tr><th scope="row">Overall</th><td>5.5 / 6</td></tr></tfoot>
        </table>
      </section>''',
    "zh": '''      <section aria-labelledby="toefl-title">
        <h2 id="toefl-title">托福 iBT</h2>
        <p class="meta">2026 年 7 月 19 日考试 · 7 月 23 日取得成绩 · 采用 1–6 分制</p>
        <table class="score-table">
          <thead><tr><th scope="col">项目</th><th scope="col">分数</th></tr></thead>
          <tbody>
            <tr><th scope="row">阅读</th><td>5.0</td></tr>
            <tr><th scope="row">听力</th><td>5.5</td></tr>
            <tr><th scope="row">口语</th><td>5.5</td></tr>
            <tr><th scope="row">写作</th><td>6.0</td></tr>
          </tbody>
          <tfoot><tr><th scope="row">总分</th><td>5.5 / 6</td></tr></tfoot>
        </table>
      </section>''',
}
AWARDS_BLOCKS = {
    "en": '''      <section aria-labelledby="awards-title">
        <h2 id="awards-title">Honors &amp; Awards</h2>
        <p class="meta">North China University of Water Resources and Electric Power</p>
        <ul class="item-list awards-list">
          <li class="dated"><time class="date" datetime="2025-11-30">Nov 30, 2025</time><div><h3>First Prize Academic Scholarship</h3><p class="meta">2024–2025 academic year</p></div></li>
          <li class="dated"><time class="date" datetime="2025-11-30">Nov 30, 2025</time><div><h3>First Prize Outstanding Student Scholarship</h3><p class="meta">2024–2025 academic year</p></div></li>
          <li class="dated"><time class="date" datetime="2024-11-30">Nov 30, 2024</time><div><h3>First Prize Academic Scholarship</h3><p class="meta">2023–2024 academic year</p></div></li>
          <li class="dated"><time class="date" datetime="2024-11-30">Nov 30, 2024</time><div><h3>Third Prize Outstanding Student Scholarship</h3><p class="meta">2023–2024 academic year</p></div></li>
        </ul>
      </section>''',
    "zh": '''      <section aria-labelledby="awards-title">
        <h2 id="awards-title">荣誉与奖学金</h2>
        <p class="meta">华北水利水电大学</p>
        <ul class="item-list awards-list">
          <li class="dated"><time class="date" datetime="2025-11-30">2025.11.30</time><div><h3>2024—2025 学年一等奖学业奖学金</h3></div></li>
          <li class="dated"><time class="date" datetime="2025-11-30">2025.11.30</time><div><h3>2024—2025 学年一等优秀学生奖学金</h3></div></li>
          <li class="dated"><time class="date" datetime="2024-11-30">2024.11.30</time><div><h3>2023—2024 学年一等奖学业奖学金</h3></div></li>
          <li class="dated"><time class="date" datetime="2024-11-30">2024.11.30</time><div><h3>2023—2024 学年三等优秀学生奖学金</h3></div></li>
        </ul>
      </section>''',
}

CONTENT = {
    "en": {
        "home": '''      <section class="intro" aria-labelledby="intro-title">
        <div>
          <h1 id="intro-title">Hello, I’m Jiayuan Zhang</h1>
          <p class="lead">I am an undergraduate in Computer Science and Technology at North China University of Water Resources and Electric Power. I am interested in AI, machine learning, and computer systems.</p>
          <p>This site collects my notes, projects, and moments from everyday life.</p>
          <div class="link-row"><a href="https://github.com/JiayuanZhang0121">GitHub</a><a href="{{ABOUT}}">More about me</a></div>
        </div>
        <aside class="profile-facts" aria-label="Profile at a glance">
          <p><strong>Jiayuan Zhang</strong></p>
          <p>Computer Science undergraduate</p>
          <p>NCWU · Zhengzhou, China</p>
          <p>AI · Machine Learning · Systems</p>
        </aside>
      </section>
      <section aria-labelledby="news-title">
        <h2 id="news-title">News</h2>
        <ul class="list news-list">
          <li><time datetime="2026-09-24">Sep 24, 2026</time> — Received preliminary admission to <a href="https://english.zzu.edu.cn/">Zhengzhou University</a> for postgraduate study through the recommendation track.</li>
          <li><time datetime="2026-07-23">Jul 23, 2026</time> — Received my TOEFL iBT result: <strong>5.5 / 6</strong>.</li>
          <li><time datetime="2026-07-19">Jul 19, 2026</time> — Took the TOEFL iBT.</li>
        </ul>
      </section>
{{SCORES}}
      <section aria-labelledby="education-title">
        <h2 id="education-title">Education</h2>
        <h3><a href="https://www2.ncwu.edu.cn/ncwuenglish/">North China University of Water Resources and Electric Power</a></h3>
        <p>Undergraduate, Computer Science and Technology · School of Information Engineering · 2023–present</p>
        <p class="document-links">Undergraduate transcripts: <a href="{{DOC_EN}}" type="application/pdf">English PDF</a> · <a href="{{DOC_ZH}}" type="application/pdf">Chinese PDF</a></p>
        <p class="notice">Public copies have the student ID redacted.</p>
      </section>
{{AWARDS}}
      <section aria-labelledby="explore-title">
        <h2 id="explore-title">Explore</h2>
        <ul class="item-list">
          <li><h3><a href="{{STUDY}}">Study</a></h3><p>Learning notes on machine learning and computer systems.</p></li>
          <li><h3><a href="{{PROJECTS}}">Projects</a></h3><p>Things I am building and have built.</p></li>
          <li><h3><a href="{{LIFE}}">Life</a></h3><p>Small records from outside the classroom.</p></li>
        </ul>
      </section>''',
        "study": '''      <h1>Study</h1>
      <p class="page-intro">I use this space to keep track of questions, methods, and results as I learn.</p>
      <h2>Areas of interest</h2>
      <ul class="item-list">
        <li><h3>AI / Machine Learning</h3><p>Courses, papers, experiments, and implementation notes.</p></li>
        <li><h3>Computer Systems</h3><p>Operating systems, networks, Linux, and development tools.</p></li>
      </ul>
      <h2>Notes</h2>
      <p class="notice">Detailed notes are being organized and will appear here as they become ready.</p>''',
        "projects": '''      <h1>Projects</h1>
      <p class="page-intro">A record of things I have made and the problems they address.</p>
      <h2>Selected work</h2>
      <ul class="item-list">
        <li><h3><a href="https://github.com/JiayuanZhang0121/JiayuanZhang0121.github.io">Personal website</a></h3><p>This static website for notes, projects, and life updates, hosted on GitHub Pages.</p><p class="meta">HTML · CSS · GitHub Pages</p></li>
      </ul>
      <p class="notice">More projects will be added when there is work ready to share.</p>''',
        "life": '''      <h1>Life</h1>
      <p class="page-intro">A place for everyday moments, travel, photos, and other things worth remembering.</p>
      <h2>Entries</h2>
      <ul class="item-list"><li class="dated"><time class="date" datetime="2026-09">Sep 2026</time><div><h3>Website online</h3><p>A small beginning for a space that can grow over time.</p></div></li></ul>''',
        "about": '''      <h1>About me</h1>
      <p class="lead">I am Jiayuan Zhang, an undergraduate studying Computer Science and Technology at North China University of Water Resources and Electric Power.</p>
      <p>My interests include AI, machine learning, and computer systems. I use this site to document what I learn, share my projects, and keep a few personal notes.</p>
      <h2>Education</h2>
      <ul class="item-list">
        <li><h3>North China University of Water Resources and Electric Power</h3><p>Computer Science and Technology, School of Information Engineering · Undergraduate, 2023–present</p></li>
        <li><h3>Zhengzhou University</h3><p>Preliminarily admitted for postgraduate study through the recommendation track on Sep 24, 2026.</p></li>
      </ul>
{{SCORES}}
{{AWARDS}}
      <h2>Documents</h2>
      <p class="document-links">Undergraduate transcripts: <a href="{{DOC_EN}}" type="application/pdf">English PDF</a> · <a href="{{DOC_ZH}}" type="application/pdf">Chinese PDF</a></p>
      <p class="notice">These public copies have the student ID redacted. The TOEFL score report is not published here.</p>
      <h2>Contact</h2>
      <p>GitHub: <a href="https://github.com/JiayuanZhang0121">@JiayuanZhang0121</a></p>''',
    },
    "zh": {
        "home": '''      <section class="intro" aria-labelledby="intro-title">
        <div>
          <h1 id="intro-title">你好，我是张家源</h1>
          <p class="lead">我目前就读于华北水利水电大学信息工程学院计算机科学与技术专业，关注人工智能、机器学习和计算机系统。</p>
          <p>这个网站记录我的学习、项目和生活中的一些片段。</p>
          <div class="link-row"><a href="https://github.com/JiayuanZhang0121">GitHub</a><a href="{{ABOUT}}">关于我</a></div>
        </div>
        <aside class="profile-facts" aria-label="个人简介">
          <p><strong>张家源 · Jiayuan Zhang</strong></p>
          <p>计算机科学与技术本科生</p>
          <p>华北水利水电大学 · 郑州</p>
          <p>人工智能 · 机器学习 · 计算机系统</p>
        </aside>
      </section>
      <section aria-labelledby="news-title">
        <h2 id="news-title">近期动态</h2>
        <ul class="list news-list">
          <li><time datetime="2026-09-24">2026.09.24</time> — 获<a href="https://www.zzu.edu.cn/">郑州大学</a>推免预录取。</li>
          <li><time datetime="2026-07-23">2026.07.23</time> — 取得托福 iBT 成绩 <strong>5.5 / 6</strong>。</li>
          <li><time datetime="2026-07-19">2026.07.19</time> — 参加托福 iBT 考试。</li>
        </ul>
      </section>
{{SCORES}}
      <section aria-labelledby="education-title">
        <h2 id="education-title">教育背景</h2>
        <h3><a href="https://www.ncwu.edu.cn/">华北水利水电大学</a></h3>
        <p>信息工程学院 · 计算机科学与技术专业 · 本科在读（2023 年至今）</p>
        <p class="document-links">本科成绩单：<a href="{{DOC_ZH}}" type="application/pdf">中文版 PDF</a> · <a href="{{DOC_EN}}" type="application/pdf">英文版 PDF</a></p>
        <p class="notice">公开版本已遮盖学号。</p>
      </section>
{{AWARDS}}
      <section aria-labelledby="explore-title">
        <h2 id="explore-title">浏览更多</h2>
        <ul class="item-list">
          <li><h3><a href="{{STUDY}}">学习</a></h3><p>机器学习、计算机系统与学习笔记。</p></li>
          <li><h3><a href="{{PROJECTS}}">项目</a></h3><p>正在做和已经完成的作品。</p></li>
          <li><h3><a href="{{LIFE}}">生活</a></h3><p>课堂之外的小记录。</p></li>
        </ul>
      </section>''',
        "study": '''      <h1>学习</h1>
      <p class="page-intro">把学习中的问题、方法与结果整理成能重新找到的笔记。</p>
      <h2>关注方向</h2>
      <ul class="item-list">
        <li><h3>人工智能 / 机器学习</h3><p>课程笔记、论文阅读、实验记录和实践中遇到的问题。</p></li>
        <li><h3>计算机系统</h3><p>操作系统、网络、Linux 和日常使用的工具链。</p></li>
      </ul>
      <h2>学习记录</h2>
      <p class="notice">详细笔记正在整理中，准备好后会放在这里。</p>''',
        "projects": '''      <h1>项目</h1>
      <p class="page-intro">记录做过的东西，以及它们解决了什么问题。</p>
      <h2>项目列表</h2>
      <ul class="item-list">
        <li><h3><a href="https://github.com/JiayuanZhang0121/JiayuanZhang0121.github.io">个人网站</a></h3><p>用于整理学习、项目与生活记录的静态网站，部署在 GitHub Pages。</p><p class="meta">HTML · CSS · GitHub Pages</p></li>
      </ul>
      <p class="notice">其他项目会在有可公开的内容后补充。</p>''',
        "life": '''      <h1>生活</h1>
      <p class="page-intro">这里存放日常、旅行、照片和偶尔想写下来的事情。</p>
      <h2>记录</h2>
      <ul class="item-list"><li class="dated"><time class="date" datetime="2026-09">2026.09</time><div><h3>网站上线</h3><p>从一个简单的页面开始，给生活留一个可以慢慢填满的地方。</p></div></li></ul>''',
        "about": '''      <h1>关于我</h1>
      <p class="lead">你好，我是张家源，目前在华北水利水电大学信息工程学院攻读计算机科学与技术专业本科。</p>
      <p>我对人工智能、机器学习和计算机系统感兴趣。这个网站用来整理学习过程、展示项目，也为生活中的小事留下一点空间。</p>
      <h2>教育背景</h2>
      <ul class="item-list">
        <li><h3>华北水利水电大学</h3><p>信息工程学院 · 计算机科学与技术 · 本科在读（2023 年至今）</p></li>
        <li><h3>郑州大学</h3><p>2026 年 9 月 24 日获推免预录取，尚未入学。</p></li>
      </ul>
{{SCORES}}
{{AWARDS}}
      <h2>相关材料</h2>
      <p class="document-links">本科成绩单：<a href="{{DOC_ZH}}" type="application/pdf">中文版 PDF</a> · <a href="{{DOC_EN}}" type="application/pdf">英文版 PDF</a></p>
      <p class="notice">公开版本已遮盖学号。托福成绩报告未在网站公开。</p>
      <h2>联系与链接</h2>
      <p>GitHub：<a href="https://github.com/JiayuanZhang0121">@JiayuanZhang0121</a></p>''',
    },
}


def page(language: str, route: str) -> str:
    localized = language == "zh"
    relative = Path("zh") / ("index.html" if route == "home" else f"{route}/index.html") if localized else Path("index.html" if route == "home" else f"{route}/index.html")
    root = "../" * (len(relative.parts) - 1)
    current_base = "zh/" if localized else ""
    alternate_base = "" if localized else "zh/"

    def target(base: str, destination: str) -> str:
        return root + base + ("index.html" if destination == "home" else f"{destination}/")

    nav = "\n".join(
        f'        <a href="{target(current_base, key)}"{(" aria-current=\"page\"" if key == route else "")}>{label}</a>'
        for key, label in zip(ROUTES, LABELS[language])
    )
    switch = "\n".join(
        f'        <a href="{target("" if lang == "en" else "zh/", route)}" lang="{"en" if lang == "en" else "zh-CN"}"{(" aria-current=\"true\"" if lang == language else "")}>{"EN" if lang == "en" else "中文"}</a>'
        for lang in ("en", "zh")
    )
    body = CONTENT[language][route]
    replacements = {
        "{{SCORES}}": SCORE_BLOCKS[language],
        "{{AWARDS}}": AWARDS_BLOCKS[language],
        "{{DOC_EN}}": root + "assets/docs/transcript-en-redacted.pdf",
        "{{DOC_ZH}}": root + "assets/docs/transcript-zh-redacted.pdf",
        **{f"{{{{{key.upper()}}}}}": target(current_base, key) for key in ROUTES},
    }
    for placeholder, value in replacements.items():
        body = body.replace(placeholder, value)
    title = TITLES[language][ROUTES.index(route)]
    description = "Jiayuan Zhang's personal website: education, notes, projects, and life." if not localized else "张家源的个人网站：教育背景、学习笔记、项目与生活记录。"
    subtitle = "Computer Science · Notes · Projects" if not localized else "计算机科学 · 学习笔记 · 项目"
    footer = "© 2026 Jiayuan Zhang" if not localized else "© 2026 张家源 · Jiayuan Zhang"
    skip = "Skip to content" if not localized else "跳转到正文"
    nav_label = "Main navigation" if not localized else "主导航"
    return f'''<!doctype html>
<html lang="{"zh-CN" if localized else "en"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="description" content="{description}">
  <link rel="alternate" hreflang="en" href="{target("", route)}">
  <link rel="alternate" hreflang="zh-CN" href="{target("zh/", route)}">
  <title>{title} · Jiayuan Zhang</title>
  <link rel="stylesheet" href="{root}assets/style.css">
</head>
<body>
  <a class="skip-link" href="#content">{skip}</a>
  <div class="page">
    <header class="site-header">
      <div class="header-top">
        <div><p class="site-name"><a href="{target(current_base, "home")}">{"张家源" if localized else "Jiayuan Zhang"}</a></p><p class="site-subtitle">{subtitle}</p></div>
        <nav class="language-switch" aria-label="Language / 语言">
{switch}
        </nav>
      </div>
      <nav class="site-nav" aria-label="{nav_label}">
{nav}
      </nav>
    </header>
    <main id="content">
{body}
    </main>
    <footer class="site-footer">{footer} · <a href="https://github.com/JiayuanZhang0121">GitHub</a></footer>
  </div>
</body>
</html>
'''


if __name__ == "__main__":
    for language in ("en", "zh"):
        for route in ROUTES:
            relative = Path("zh") / ("index.html" if route == "home" else f"{route}/index.html") if language == "zh" else Path("index.html" if route == "home" else f"{route}/index.html")
            destination = ROOT / relative
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(page(language, route), encoding="utf-8")
            print(relative)
