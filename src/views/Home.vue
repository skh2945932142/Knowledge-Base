<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, MoreFilled, Document } from '@element-plus/icons-vue'
import NoteList from '../components/NoteList.vue'

// --- 配置 ---
const router = useRouter()
const API_BASE = '/api'

// --- 状态 ---
const notes = ref([])
const currentNote = ref(null)
const isSaving = ref(false)
let saveTimer = null

// 辅助函数
const getHeaders = () => {
    const token = localStorage.getItem('token')
    return { Authorization: `Bearer ${token}` }
}

// ===================================
// 核心业务逻辑 (保持不变)
// ===================================

const fetchNotes = async () => {
    try {
        const res = await axios.get(`${API_BASE}/notes`, { headers: getHeaders() })
        notes.value = res.data
        if (notes.value.length > 0 && !currentNote.value) {
            currentNote.value = notes.value[0]
        }
    } catch (err) {
        if (err.response?.status === 401) {
            router.push('/login')
        }
    }
}

const handleAddNote = async () => {
    try {
        const res = await axios.post(`${API_BASE}/notes`, {}, { headers: getHeaders() })
        const newNote = res.data
        notes.value.unshift(newNote)
        currentNote.value = newNote
        ElMessage.success('页面创建成功')
    } catch {
        ElMessage.error('页面创建失败')
    }
}

// ... 


const handleSelectNote = (note) => {
    currentNote.value = note
}

const saveCurrentNote = async () => {
    if (!currentNote.value) return
    isSaving.value = true
    try {
        await axios.put(
            `${API_BASE}/notes/${currentNote.value._id}`,
            { title: currentNote.value.title, content: currentNote.value.content },
            { headers: getHeaders() }
        )
        const target = notes.value.find(n => n._id === currentNote.value._id)
        if (target) {
            target.title = currentNote.value.title
            target.content = currentNote.value.content
            target.updatedAt = new Date().toISOString()
        }
        isSaving.value = false
    } catch {
        isSaving.value = false
    }
}

watch(
    () => currentNote.value,
    (newVal, oldVal) => {
        if (newVal && oldVal && newVal._id === oldVal._id) {
            clearTimeout(saveTimer)
            saveTimer = setTimeout(saveCurrentNote, 1000)
        }
    },
    { deep: true }
)

const handleDelete = async () => {
    if (!currentNote.value) return
    try {
        await ElMessageBox.confirm('确定将此页面放入回收站吗？', '删除页面', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
        })
        await axios.delete(`${API_BASE}/notes/${currentNote.value._id}`, { headers: getHeaders() })
        notes.value = notes.value.filter(n => n._id !== currentNote.value._id)
        currentNote.value = notes.value.length ? notes.value[0] : null
        ElMessage.success('页面已移至回收站')
    } catch {
        // cancel
    }
}

const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
}

onMounted(() => {
    fetchNotes()
})

</script>

<template>
  <div class="notion-layout">
    <el-container class="full-height">
      <el-aside
        width="240px"
        class="notion-sidebar"
      >
        <div class="sidebar-header">
          <div class="workspace-name">
            <span class="workspace-initial">K</span> 我的知识库
          </div>
          <el-dropdown trigger="click">
            <el-icon class="setting-icon">
              <MoreFilled />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  class="danger-text"
                  @click="handleLogout"
                >
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div class="sidebar-content">
          <NoteList
            :notes="notes"
            :current-note="currentNote"
            @set-current-note="handleSelectNote"
            @add-note="handleAddNote"
          />
        </div>
      </el-aside>

      <el-main class="notion-main">
        <div
          v-if="currentNote"
          class="editor-container"
        >
          <div class="top-bar">
            <div class="breadcrumbs">
              <el-icon class="breadcrumb-icon">
                <Document />
              </el-icon>
              <span class="page-path">{{ currentNote.title || '无标题' }}</span>
              <span
                v-if="isSaving"
                class="saving-dot"
              />
            </div>

            <el-button
              text
              bg
              size="small"
              class="action-btn"
              @click="handleDelete"
            >
              <el-icon>
                <Delete />
              </el-icon>
            </el-button>
          </div>

          <div class="cover-image" />

          <div class="content-wrapper">
            <input
              v-model="currentNote.title"
              class="big-title"
              placeholder="无标题"
            >
            <v-md-editor
              v-model="currentNote.content"
              height="calc(100vh - 250px)"
              placeholder="支持 Markdown 快捷指令：
# 一级标题   ## 二级标题
- 无序列表   1. 有序列表
> 引用       ``` 代码块"
              left-toolbar="undo redo | h1 h2 h3 | bold italic | code quote | link image"
              right-toolbar="preview fullscreen"
              :toolbar-config="{
                'undo': { icon: 'v-md-icon-undo' },
                'redo': { icon: 'v-md-icon-redo' },
              }"
            />
          </div>
        </div>

        <div
          v-else
          class="empty-state"
        >
          <div class="empty-content">
            <h1>暂无页面</h1>
            <p>创建一个页面，用于整理文档、计划和工作记录。</p>
            <el-button
              type="primary"
              size="large"
              @click="handleAddNote"
            >
              新建页面
            </el-button>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
/* 全局布局 */
.notion-layout {
    height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    color: #37352f;
}

.full-height {
    height: 100%;
}

/* --- 侧边栏风格 --- */
.notion-sidebar {
    background-color: #f7f7f5;
    /* Notion 经典的浅灰底色 */
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
}

.sidebar-header {
    height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: background 0.2s;
}

.sidebar-header:hover {
    background: rgba(0, 0, 0, 0.04);
}

.workspace-name {
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #37352f;
}

.workspace-initial {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background: #e9e9e7;
    color: #37352f;
    font-size: 12px;
    font-weight: 700;
}

.setting-icon {
    color: #999;
    transform: rotate(90deg);
}

.breadcrumb-icon {
    color: #999;
}

.sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding-top: 8px;
}

/* --- 主区域风格 --- */
.notion-main {
    padding: 0;
    background: white;
    display: flex;
    flex-direction: column;
}

.editor-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}

/* 顶部极简栏 */
.top-bar {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
}

.breadcrumbs {
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 6px;
    color: #37352f;
}

.saving-dot {
    width: 6px;
    height: 6px;
    background: #2ecc71;
    border-radius: 50%;
    margin-left: 8px;
}

.action-btn {
    color: #999;
}

.action-btn:hover {
    color: #eb5757;
    background: rgba(235, 87, 87, 0.1);
}

/* 模拟封面图（增加视觉层次） */
.cover-image {
    height: 120px;
    /* 如果不想用图，可以用渐变 */
    background: linear-gradient(180deg, #fff 0%, #fff 100%);
    /* 想更像Notion可以改成 random 图片地址 */
    /* background-image: url('https://source.unsplash.com/random/1200x200?nature'); */
    /* background-size: cover; */
    /* opacity: 0.8; */
}

/* 主内容区域 */
.content-wrapper {
    max-width: 900px;
    /* 限制最大宽度，模仿阅读体验 */
    width: 100%;
    margin: 0 auto;
    /* 居中 */
    padding: 0 48px;
    /* 左右留白 */
    flex: 1;
    display: flex;
    flex-direction: column;
}

/* 标题输入框 */
.big-title {
    font-size: 40px;
    font-weight: 700;
    border: none;
    outline: none;
    width: 100%;
    margin-bottom: 24px;
    color: #37352f;
    background: transparent;
    padding: 10px 0;
}

.big-title::placeholder {
    color: #d3d3d3;
}

/* 编辑器微调 */
:deep(.v-md-editor) {
    box-shadow: none !important;
    /* 去掉编辑器自带阴影 */
    border: none !important;
    /* 去掉边框 */
}

:deep(.v-md-editor__toolbar) {
    border-bottom: 1px solid #f0f0f0;
    /* 极淡的分割线 */
    background: transparent;
}

:deep(.v-md-editor__editor-wrapper) {
    background: transparent;
}

/* 空状态 */
.empty-state {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fbfbfa;
}

.empty-content {
    text-align: center;
}

.empty-content h1 {
    font-size: 32px;
    margin-bottom: 12px;
}

.empty-content p {
    color: #888;
    margin-bottom: 24px;
}

/* 覆盖 Element 下拉菜单样式 */
.danger-text {
    color: #eb5757;
}

/* 编辑器右侧预览区样式调整 */

/* 1. 弱化左右两栏分割线 */
:deep(.v-md-editor__preview-wrapper) {
    background: transparent !important;
    border-left: 1px dashed #f0f0f0 !important;
    /* 改用极淡的虚线，或者可以直接写 none 去掉 */
}

/* 2. 保持预览区背景与主区域一致 */
:deep(.github-markdown-body),
:deep(.vuepress-markdown-body),
:deep(.v-md-editor-preview) {
    background: transparent !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif !important;
    color: #37352f !important;
    /* Notion 标准深灰色 */
    padding: 24px 40px !important;
    /* 增加四周的“呼吸感”留白 */
}

/* 3. 调整 Markdown 引用区块 */
:deep(.v-md-editor-preview blockquote) {
    border-left: 3px solid #37352f !important;
    background: transparent !important;
    color: #787774 !important;
    padding: 2px 14px !important;
    margin: 1.2em 0 !important;
}

/* 4. 调整代码块背景 */
:deep(.v-md-editor-preview pre) {
    background-color: #f7f7f5 !important;
    border-radius: 6px !important;
    border: 1px solid rgba(0, 0, 0, 0.05) !important;
}

/* 编辑器底部状态栏 */
:deep(.v-md-editor__footer) {
    display: none !important;
}

/* 左侧输入框文本颜色 */
:deep(.v-md-editor__editor-wrapper textarea) {
    color: #37352f !important;
}

/* 右侧预览区文本颜色 */
:deep(.v-md-editor-preview),
:deep(.v-md-editor-preview p),
:deep(.v-md-editor-preview h1),
:deep(.v-md-editor-preview h2),
:deep(.v-md-editor-preview h3),
:deep(.v-md-editor-preview h4),
:deep(.v-md-editor-preview h5),
:deep(.v-md-editor-preview h6),
:deep(.v-md-editor-preview li) {
    color: #37352f !important;
}
</style>