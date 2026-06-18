<script setup lang="ts">
  // 显式声明多词组件名，否则 index.vue 会命中 vue/multi-word-component-names，导致 lint 报错。
  defineOptions({
    name: 'LandingPage',
  });
</script>
<template>
  <div class="flex min-h-screen items-center justify-center">
    <main class="flex w-full max-w-3xl flex-col items-center justify-center px-16 py-32">
      <div class="flex flex-col items-center gap-4">
        <img
          src="https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze-coding/icon/coze-coding.gif"
          alt="扣子编程 Logo"
          width="156"
          height="130"
          style="width: 156px; height: 130px; object-fit: contain"
        />
        <div class="flex flex-col items-center gap-2 text-center">
          <h1 class="max-w-xl text-base font-semibold leading-tight tracking-tight">
            应用开发中
          </h1>
          <p class="max-w-2xl text-sm leading-8 opacity-70">
            请稍后，页面即将呈现
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
