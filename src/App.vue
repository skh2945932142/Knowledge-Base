<script setup>
</script>

<template>
  <router-view />
</template>

<style>
:root {
  --el-font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  background-color: #f5f7fa;

  /* 🌟 关键修复 1：强制全局字体为深灰色 */
  color: #37352f !important;

  /* 字体更清晰 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 🌟 关键修复 2：暴力覆盖 Markdown 编辑器的所有相关字体颜色 */
.v-md-editor__editor-wrapper textarea,
.v-md-editor-preview,
.v-md-editor-preview p,
.v-md-editor-preview h1,
.v-md-editor-preview h2,
.v-md-editor-preview h3,
.v-md-editor-preview h4,
.v-md-editor-preview h5,
.v-md-editor-preview h6,
.v-md-editor-preview li,
.v-md-editor-preview blockquote {
  color: #37352f !important;
}

/* 🌟 关键修复 3：强制代码块（源码和预览区）里的基础文字变为深灰色 */
.v-md-editor-preview pre,
.v-md-editor-preview code,
.v-md-editor__editor-wrapper .scrollbar__wrap {
  color: #37352f !important;
}

/* 覆盖代码高亮插件(Prism)自带的白色/浅色类名，防止部分符号看不清 */
.v-md-editor-preview .token.punctuation,
.v-md-editor-preview .token.operator,
.v-md-editor-preview .token.entity,
.v-md-editor-preview .token.variable {
  color: #37352f !important;
}
</style>