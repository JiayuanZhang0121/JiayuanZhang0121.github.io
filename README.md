# Jiayuan Zhang 的个人网站

一个白底、简约的静态个人网站，包含首页、学习、项目、生活和关于页面。网页文件位于仓库根目录，可由 GitHub Pages 直接发布，不需要构建步骤或 JavaScript。

## 修改内容

- 在 `generate_site.py` 中编辑各页文字，然后运行 `python generate_site.py` 更新 HTML 文件。
- 在 `assets/style.css` 中调整排版和颜色。
- 请将个人身份、联系方式和项目内容按实际情况填写；目前只展示已知的信息，没有示例邮箱或虚构项目。

本地预览可在仓库根目录运行 `python -m http.server 8000`，然后打开 `http://localhost:8000/`。
