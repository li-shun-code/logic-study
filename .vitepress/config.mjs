import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '逻辑学导论 · 学习指南',
  description: '把《逻辑学导论（第15版）》读成一步一步能走完的课程',
  lang: 'zh-CN',
  srcDir: 'docs',
  base: '/logic-study/',
  cleanUrls: true,
  lastUpdated: false,
  themeConfig: {
    nav: [
      { text: '开始', link: '/guide/' },
      { text: '前言', link: '/preface/' },
      { text: '术语表', link: '/reference/terms' },
      { text: '章节总览', link: '/guide/#章节总览' },
    ],
    sidebar: [
      {
        text: '开始之前',
        items: [
          { text: '学习路径', link: '/guide/' },
          { text: '前言：这本书该怎么读', link: '/preface/' },
          { text: '中英文术语表', link: '/reference/terms' },
        ],
      },
  {
    text: "第1章 逻辑学的基本概念",
    collapsed: false,
    items: [
      { text: '章节回顾', link: '/ch01/' },
      { text: "1.1 什么是逻辑学", link: '/ch01/1.1' },
      { text: "1.2 命题与论证", link: '/ch01/1.2' },
      { text: "1.3 论证的辨识", link: '/ch01/1.3' },
      { text: "1.4 论证与说明", link: '/ch01/1.4' },
      { text: "1.5 演绎论证与归纳论证", link: '/ch01/1.5' },
      { text: "1.6 有效性与真实性", link: '/ch01/1.6' }
    ],
  },
  {
    text: "第2章 论证的分析",
    collapsed: false,
    items: [
      { text: '章节回顾', link: '/ch02/' },
      { text: "2.1 论证的重塑", link: '/ch02/2.1' },
      { text: "2.2 论证的图示", link: '/ch02/2.2' },
      { text: "2.3 复杂的论证性语段", link: '/ch02/2.3' },
      { text: "2.4 推理中的问题", link: '/ch02/2.4' }
    ],
  },
  {
    text: "第3章 语言与定义",
    collapsed: false,
    items: [
      { text: '章节回顾', link: '/ch03/' },
      { text: "3.1 语言的功能", link: '/ch03/3.1' },
      { text: "3.2 情感语言、中性语言与论争", link: '/ch03/3.2' },
      { text: "3.3 论争与含混性", link: '/ch03/3.3' },
      { text: "3.4 定义及其用途", link: '/ch03/3.4' },
      { text: "3.5 定义的结构：外延与内涵", link: '/ch03/3.5' },
      { text: "3.6 属加种差定义", link: '/ch03/3.6' }
    ],
  },
  {
    text: "第4章 谬误",
    collapsed: true,
    items: [
      { text: '章节回顾', link: '/ch04/' },
      { text: "4.1 什么是谬误", link: '/ch04/4.1' },
      { text: "4.2 谬误的分类", link: '/ch04/4.2' },
      { text: "4.3 相干谬误", link: '/ch04/4.3' },
      { text: "4.4 不当归纳谬误", link: '/ch04/4.4' },
      { text: "4.5 预设谬误", link: '/ch04/4.5' },
      { text: "4.6 含混谬误", link: '/ch04/4.6' }
    ],
  },
  {
    text: "第5章 直言命题",
    collapsed: true,
    items: [
      { text: '章节回顾', link: '/ch05/' },
      { text: "5.1 演绎理论", link: '/ch05/5.1' },
      { text: "5.2 类与直言命题", link: '/ch05/5.2' },
      { text: "5.3 四种直言命题", link: '/ch05/5.3' },
      { text: "5.4 质、量与周延性", link: '/ch05/5.4' },
      { text: "5.5 传统对当方阵", link: '/ch05/5.5' },
      { text: "5.6 其他直接推论", link: '/ch05/5.6' },
      { text: "5.7 存在含义与直言命题的解释", link: '/ch05/5.7' },
      { text: "5.8 直言命题的符号系统与图解", link: '/ch05/5.8' }
    ],
  },
  {
    text: "第6章 直言三段论",
    collapsed: true,
    items: [
      { text: '章节回顾', link: '/ch06/' },
      { text: "6.1 直言三段论的标准形式", link: '/ch06/6.1' },
      { text: "6.2 三段论论证的形式性质", link: '/ch06/6.2' },
      { text: "6.3 检验三段论：文恩图解法", link: '/ch06/6.3' },
      { text: "6.4 三段论规则与三段论谬误", link: '/ch06/6.4' },
      { text: "6.5 直言三段论的15个有效形式", link: '/ch06/6.5' }
    ],
  },
  {
    text: "第7章 日常语言中的论证",
    collapsed: true,
    items: [
      { text: '章节回顾', link: '/ch07/' },
      { text: "7.1 三段论论证", link: '/ch07/7.1' },
      { text: "7.2 词项数量归约为三", link: '/ch07/7.2' },
      { text: "7.3 直言命题的标准化", link: '/ch07/7.3' },
      { text: "7.4 协同翻译", link: '/ch07/7.4' },
      { text: "7.5 省略式三段论", link: '/ch07/7.5' },
      { text: "7.6 连锁三段论", link: '/ch07/7.6' },
      { text: "7.7 析取三段论与假言三段论", link: '/ch07/7.7' },
      { text: "7.8 二难推论", link: '/ch07/7.8' }
    ],
  },
  {
    text: "第8章 命题逻辑Ⅰ：真值函项陈述与论证",
    collapsed: true,
    items: [
      { text: '章节回顾', link: '/ch08/' },
      { text: "8.1 现代逻辑及其符号语言", link: '/ch08/8.1' },
      { text: "8.2 真值函项性：简单陈述与复合陈述", link: '/ch08/8.2' },
      { text: "8.3 合取、否定与析取", link: '/ch08/8.3' },
      { text: "8.4 条件陈述与实质蕴涵", link: '/ch08/8.4' },
      { text: "8.5 论证形式与运用逻辑类推进行的反驳", link: '/ch08/8.5' },
      { text: "8.6 “无效”和“有效”的精确含义", link: '/ch08/8.6' },
      { text: "8.7 根据真值表验证论证：完备的真值表方法", link: '/ch08/8.7' },
      { text: "8.8 一些常见的论证形式", link: '/ch08/8.8' },
      { text: "8.9 陈述形式与实质等值", link: '/ch08/8.9' },
      { text: "8.10 逻辑等价", link: '/ch08/8.10' },
      { text: "8.11 三大“思想法则”：逻辑的原理", link: '/ch08/8.11' }
    ],
  },
  {
    text: "第9章 命题逻辑Ⅱ：演绎方法",
    collapsed: true,
    items: [
      { text: '章节回顾', link: '/ch09/' },
      { text: "9.1 有效性的形式证明", link: '/ch09/9.1' },
      { text: "9.2 基本的有效论证形式", link: '/ch09/9.2' },
      { text: "9.3 有效性形式证明示例", link: '/ch09/9.3' },
      { text: "9.4 有效性形式证明的构造", link: '/ch09/9.4' },
      { text: "9.5 构造更复杂的形式证明", link: '/ch09/9.5' },
      { text: "9.6 扩展推论规则：替换规则", link: '/ch09/9.6' },
      { text: "9.7 自然演绎系统", link: '/ch09/9.7' },
      { text: "9.8 运用19个推论规则构建形式证明", link: '/ch09/9.8' },
      { text: "9.9 简化的真值表方法", link: '/ch09/9.9' },
      { text: "9.10 不相容性", link: '/ch09/9.10' },
      { text: "9.11 条件证明", link: '/ch09/9.11' },
      { text: "9.12 间接证明", link: '/ch09/9.12' },
      { text: "9.13 可靠性论证与笃证性论证的辨别", link: '/ch09/9.13' }
    ],
  },
  {
    text: "第10章 谓词逻辑：量化理论",
    collapsed: true,
    items: [
      { text: '章节回顾', link: '/ch10/' },
      { text: "10.1 对量化的呼唤", link: '/ch10/10.1' },
      { text: "10.2 单称命题", link: '/ch10/10.2' },
      { text: "10.3 全称量词与存在量词", link: '/ch10/10.3' },
      { text: "10.4 传统主谓命题", link: '/ch10/10.4' },
      { text: "10.5 有效性证明", link: '/ch10/10.5' },
      { text: "10.6 无效性证明", link: '/ch10/10.6' },
      { text: "10.7 非三段论推论", link: '/ch10/10.7' }
    ],
  },
  {
    text: "第11章 类比推理",
    collapsed: true,
    items: [
      { text: '章节回顾', link: '/ch11/' },
      { text: "11.1 归纳与演绎再探", link: '/ch11/11.1' },
      { text: "11.2 类比论证", link: '/ch11/11.2' },
      { text: "11.3 类比论证的评价", link: '/ch11/11.3' },
      { text: "11.4 通过逻辑类推进行的反驳", link: '/ch11/11.4' }
    ],
  },
  {
    text: "第12章 因果推理",
    collapsed: true,
    items: [
      { text: '章节回顾', link: '/ch12/' },
      { text: "12.1 原因与结果", link: '/ch12/12.1' },
      { text: "12.2 因果律与自然齐一性", link: '/ch12/12.2' },
      { text: "12.3 简单枚举归纳法", link: '/ch12/12.3' },
      { text: "12.4 因果分析的方法", link: '/ch12/12.4' },
      { text: "12.5 归纳技术的局限", link: '/ch12/12.5' }
    ],
  },
  {
    text: "第13章 科学与假说",
    collapsed: true,
    items: [
      { text: '章节回顾', link: '/ch13/' },
      { text: "13.1 科学说明", link: '/ch13/13.1' },
      { text: "13.2 科学探究：假说与确证", link: '/ch13/13.2' },
      { text: "13.3 对竞争性科学说明的评价", link: '/ch13/13.3' },
      { text: "13.4 作为假说的分类", link: '/ch13/13.4' }
    ],
  },
  {
    text: "第14章 概率",
    collapsed: true,
    items: [
      { text: '章节回顾', link: '/ch14/' },
      { text: "14.1 关于概率的几种观点", link: '/ch14/14.1' },
      { text: "14.2 概率演算", link: '/ch14/14.2' },
      { text: "14.3 日常生活中的概率", link: '/ch14/14.3' }
    ],
  }
    ],
    search: {
      provider: 'local',
      options: { translations: { placeholder: '搜索课程与术语…' } },
    },
    outline: { title: '本课路线', level: [2, 3] },
    docFooter: { prev: '上一课', next: '下一课' },
    footer: { message: '原创讲解 · 按原书章节顺序 · 无账号无追踪' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '课程目录',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
  },
})
