## 前言
- 原神米游社签到网页版（支持多账号）
- vercel接口有点慢...

## 原神米游社有签到功能为啥还要写网页版（可能闲的）
## Cookie如何获取
- 通过浏览器登录米哈游论坛 https://bbs.mihoyo.com/ys/
- 按F12，打开开发者工具 -> Console

```
confirm("确认将cookie复制到剪切板中？")&&copy(document.cookie)
```
![get Cookie](https://cdn.jsdelivr.net/gh/itxve/mys-ys-sign/public/assets/cookie.jpg)

## demo
- [在线预览](https://mhy-api.vercel.app/)

- ![demo](https://cdn.jsdelivr.net/gh/itxve/mys-ys-sign/public/assets/screen.png)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Deploy on Vercel

Are you ready to deploy your first PHP project to Vercel? Click & Go!

<a href="https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fitxve%2Fmhy-api"><img src="https://vercel.com/button"></a>


## 参考项目

[YSChckIn](https://github.com/ZtionJam/YSChckIn)

## 免责声明
本代码仅用于学习，请勿非法使用!!!

