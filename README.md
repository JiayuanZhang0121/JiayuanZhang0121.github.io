# Jiayuan Zhang 的个人网站

一个白底、简约的双语静态个人网站。仓库根目录默认是英文版，`zh/` 是中文版；每个页面右上角都可以切换语言。GitHub Pages 可直接发布，不需要构建步骤或 JavaScript。

## 修改内容

- 在 `generate_site.py` 中编辑各页文字，然后运行 `python generate_site.py` 更新英文和中文 HTML 文件。
- 在 `assets/style.css` 中调整排版和颜色。
- 公开成绩单位于 `assets/docs/`，均已遮盖学号和二维码；不要用原始 PDF 覆盖这些公开副本。
- 托福成绩报告只用于核对考试日期和分数，不上传到网站。
- 请将个人身份、联系方式和项目内容按实际情况填写；网站没有示例邮箱或虚构项目。

本地预览可在仓库根目录运行 `python -m http.server 8000`，然后打开 `http://localhost:8000/`。
