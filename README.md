# 子夜 · 茗香晓筑生活美学空间

**这是子夜老师「茗香晓筑生活美学空间」官方网站的源代码仓库。**

网站用于介绍茗香晓筑、展示产品与空间，并为到店预约、雅集报名和品牌合作提供联系入口。

- 网站地址：[yejuantea.com](https://yejuantea.com/)
- 代码仓库：[ziye971115/my-website](https://github.com/ziye971115/my-website)
- 品牌理念：凡是生活，皆可美学。

## 网站里有什么

| 板块 | 内容 |
| --- | --- |
| 品牌故事 | 茗香晓筑生活美学空间的介绍 |
| 关于子夜老师 | 创始人介绍与个人经历 |
| 服务项目 | 茶事雅集、花艺、非遗手作、空间预约 |
| 产品中心 | 茶类、缠丝玛瑙类、墨红玫瑰类，含产品详情与图片展示 |
| 空间场景 | 古村与茶空间的实景照片 |
| 联系入口 | 微信、小红书、抖音、微信公众号等渠道 |

## 想修改网站，应该找哪个文件

| 文件或目录 | 用途 | 什么时候需要修改 |
| --- | --- | --- |
| [`src/main.jsx`](src/main.jsx) | 网站页面、文字内容、导航和交互 | 改介绍、服务项目、产品信息、联系方式 |
| [`src/styles.css`](src/styles.css) | 全站样式与手机适配 | 改颜色、字体、间距、排版 |
| [`assets/`](assets/) | 照片、标志、产品图等素材 | 增加或替换图片，再在页面代码中调整图片路径 |
| [`index.html`](index.html) | 网页标题、描述和页面入口 | 改浏览器标签页名称与网站简介 |
| [`package.json`](package.json) | 项目依赖和运行命令 | 调整开发工具或项目脚本 |
| [`vite.config.js`](vite.config.js) | 网站构建配置，包含素材复制逻辑 | 调整打包方式 |
| [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) | GitHub Pages 自动构建与发布流程 | 调整 GitHub Pages 部署 |

**日常改文字，主要看 `src/main.jsx`；改外观，看 `src/styles.css`；换照片，看 `assets/`。**

`dist/` 是运行构建命令后生成的网站发布文件，不是日常编辑的源代码目录，也不纳入 Git 版本管理。应修改源文件后重新构建。

## 在自己的电脑上运行

网站使用 **React + Vite**，以 **pnpm** 管理依赖。当前 GitHub 构建流程使用 Node.js 22 和 pnpm 10，本地也可使用这一组合。

首次下载项目：

```bash
git clone https://github.com/ziye971115/my-website.git
cd my-website
pnpm install --frozen-lockfile
```

启动开发预览：

```bash
pnpm run dev
```

在浏览器中打开终端显示的本地地址。保存代码后，开发预览会更新。

检查是否能正常打包，并预览正式构建：

```bash
pnpm run build
pnpm run preview
```

`build` 会生成 `dist/`；`preview` 用来在本地检查这份构建结果。**本地预览不会自动更新线上网站。**

## 修改与发布流程

1. 修改对应源文件，新增图片时保留原始照片。
2. 使用 `pnpm run dev` 查看修改效果，检查电脑和手机布局。
3. 执行 `pnpm run build`，确认构建通过。
4. 使用 `pnpm run preview` 检查正式构建。
5. 确认修改内容后，提交代码并推送到 GitHub。

仓库已配置 GitHub Pages：推送到 `main` 分支后，自动流程会安装依赖、构建网站，并发布 `dist/`。可在仓库的 [Actions 页面](https://github.com/ziye971115/my-website/actions) 查看执行结果。

自定义域名的托管、DNS 与绑定配置需在对应服务中单独管理；GitHub Pages 流程成功后，也应实际打开目标网址确认更新。

## 图片与内容维护

- 页面内容图片优先使用优化后的 WebP 格式，首屏以下图片保持延迟加载。
- 替换照片时保留原图，新版本另存，方便回溯。
- 图片路径与文件名应保持一致，修改后检查能否正常显示。
- 修改产品介绍、人物经历与联系方式前，先核对实际资料。
- 仓库没有附带开源许可证；代码可见不代表品牌照片、标志或人物肖像已授权他人使用。
