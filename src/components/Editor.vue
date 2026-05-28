<script setup>
import { onMounted, ref, watch } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    } // 接收当前笔记的 Markdown 内容
});

const emit = defineEmits(['update:modelValue']);
const vditor = ref(null);
const isVidtorReady = ref(false);// 编辑器是否初始化完成

onMounted(() => {
    vditor.value = new Vditor('vditor', {
        value: props.modelValue,// 初始化内容
        height: '100%',
        width: '100%',
        placeholder: '请输入页面内容，支持 Markdown 格式',
        cache: { enable: false },
        toolbarConfig: { pin: true },
        //监听内容变化
        input: (value) => {
            emit('update:modelValue', value);
        },
        after: () => {
            isVidtorReady.value = true;
        }
    });
    //  3.监听内容变化
    watch(() => props.modelValue, (newValue) => {
        if (isVidtorReady.value && vditor.value) {
            // 判断新值是否和编辑器中的值相同
            const currentValue = vditor.value.getValue();
            if (newValue !== currentValue) {
                vditor.value.setValue(newValue);
            }
        }
    });
});

</script>
<template>
  <div
    id="vditor"
    class="editor-container"
  />
</template>
<style scoped>
.editor-container {
    height: 100%;
    border: none !important;
}
</style>