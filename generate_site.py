"""Generate the five static pages published by GitHub Pages."""

from pathlib import Path

ROOT = Path(__file__).parent
NAV = [
    ("home", "首页"),
    ("study", "学习"),
    ("projects", "项目"),
    ("life", "生活"),
    ("about", "关于"),
]


def page(title: str, current: str, body: str, description: str) -> str:
    prefix = "" if current == "home" else "../"
    navigation = "\n".join(
        f'        <a href="{prefix}{"index.html" if key == "home" else key + "/"}"'
        f'{" aria-current=\"page\"" if key == current else ""}>{label}</a>'
        for key, label in NAV
    )
    return f'''<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="description" content="{description}">
  <title>{title} · Jiayuan Zhang</title>
  <link rel="stylesheet" href="{prefix}assets/style.css">
</head>
<body>
  <a class="skip-link" href="#content">跳转到正文</a>
  <div class="page">
    <header class="site-header">
      <p class="site-name"><a href="{prefix}index.html">Jiayuan Zhang</a></p>
      <p class="site-subtitle">学习笔记 · 项目 · 生活记录</p>
      <nav class="site-nav" aria-label="主导航">
{navigation}
      </nav>
    </header>
    <main id="content">
{body}
    </main>
    <footer class="site-footer">© 2026 Jiayuan Zhang · <a href="https://github.com/JiayuanZhang0121">GitHub</a></footer>
  </div>
</body>
</html>
'''


PAGES = {
    "index.html": page("首页", "home", '''      <section class="intro" aria-labelledby="intro-title">
        <div>
          <h1 id="intro-title">你好，我是 Jiayuan Zhang</h1>
          <p class="lead">这里记录我的学习、项目和生活。关注 AI、机器学习与计算机系统，也会写下日常发现和一些值得记住的片段。</p>
          <p>这个网站会随着学习和实践慢慢更新。</p>
          <div class="link-row"><a href="https://github.com/JiayuanZhang0121">GitHub</a><a href="about/">关于我</a></div>
        </div>
        <aside class="profile-facts" aria-label="个人信息">
          <p><strong>Jiayuan Zhang</strong></p>
          <p>Student / Developer</p>
          <p>AI · Machine Learning · Systems</p>
          <p>中文 / English</p>
        </aside>
      </section>

      <section aria-labelledby="news-title">
        <h2 id="news-title">最近动态</h2>
        <ul class="list">
          <li><span class="date">2026.09</span> 建立个人网站，开始整理学习、项目与生活记录。</li>
        </ul>
      </section>

      <section aria-labelledby="explore-title">
        <h2 id="explore-title">在这里</h2>
        <ul class="item-list">
          <li><h3><a href="study/">学习</a></h3><p>机器学习、计算机系统、论文阅读与实验笔记。</p></li>
          <li><h3><a href="projects/">项目</a></h3><p>正在做和已经完成的作品与实践。</p></li>
          <li><h3><a href="life/">生活</a></h3><p>日常、旅行、照片，以及想留下来的记录。</p></li>
        </ul>
      </section>''', "Jiayuan Zhang 的个人主页：学习笔记、项目与生活记录。"),

    "study/index.html": page("学习", "study", '''      <h1>学习</h1>
      <p class="page-intro">把学习过程中的问题、方法和结果整理成能重新找到的笔记。</p>
      <h2>关注方向</h2>
      <ul class="item-list">
        <li><h3>AI / Machine Learning</h3><p>课程笔记、论文阅读、实验记录与实践中遇到的问题。</p></li>
        <li><h3>Computer Systems</h3><p>操作系统、网络、Linux 和日常使用的工具链。</p></li>
      </ul>
      <h2>学习记录</h2>
      <p class="notice">详细笔记正在整理中。更新后会在这里列出。</p>''', "Jiayuan Zhang 的学习方向与笔记。"),

    "projects/index.html": page("项目", "projects", '''      <h1>项目</h1>
      <p class="page-intro">记录做过的东西，以及它们解决了什么问题。</p>
      <h2>项目列表</h2>
      <ul class="item-list">
        <li>
          <h3><a href="https://github.com/JiayuanZhang0121/JiayuanZhang0121.github.io">个人网站</a></h3>
          <p>用于整理学习笔记、项目与生活记录的静态网站，部署于 GitHub Pages。</p>
          <p class="meta">HTML · CSS · GitHub Pages</p>
        </li>
      </ul>
      <p class="notice">其他项目会在有可公开的内容后补充。</p>''', "Jiayuan Zhang 的项目与实践。"),

    "life/index.html": page("生活", "life", '''      <h1>生活</h1>
      <p class="page-intro">这里存放日常、旅行、照片和偶尔想写下来的事情。</p>
      <h2>记录</h2>
      <ul class="item-list">
        <li class="dated"><span class="date">2026.09</span><div><h3>网站上线</h3><p>从一个简单的页面开始，给生活留一个可以慢慢填满的地方。</p></div></li>
      </ul>''', "Jiayuan Zhang 的生活记录。"),

    "about/index.html": page("关于", "about", '''      <h1>关于我</h1>
      <p class="lead">你好，我是 Jiayuan Zhang，一名学生和开发者。</p>
      <p>我对 AI、机器学习和计算机系统感兴趣。这个网站用来整理学习过程、展示项目，也为生活中的小事留下一点空间。</p>
      <h2>联系与链接</h2>
      <ul class="list">
        <li>GitHub：<a href="https://github.com/JiayuanZhang0121">@JiayuanZhang0121</a></li>
      </ul>
      <p class="notice">其他联系方式暂未公开。</p>''', "关于 Jiayuan Zhang：兴趣、学习与联系方式。"),
}


if __name__ == "__main__":
    for relative_path, html in PAGES.items():
        destination = ROOT / relative_path
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(html, encoding="utf-8")
        print(destination.relative_to(ROOT))
