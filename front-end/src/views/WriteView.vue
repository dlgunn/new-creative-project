<template>
  <div class="input-wrapper">
    <h2>Write a new story!</h2>
    <n-input
      size="small"
      v-model:value="title"
      type="text"
      placeholder="Your title"
      :theme="darkTheme"
      :theme-overrides="themeOverrides"
    />
    <n-input
      type="textarea"
      size="small"
      v-model:value="content"
      placeholder="Write!"
      :autosize="{
        minRows: 14,
      }"
      :theme="darkTheme"
      :theme-overrides="themeOverrides"
    />
    <n-button @click="addStory()" ghost color="rgb(189, 107, 0)"
      >Submit</n-button
    >
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { NInput } from "naive-ui";
import { NButton } from "naive-ui";
import { darkTheme } from "naive-ui";

export default defineComponent({
  setup() {
    return {
      darkTheme,
    };
  },
  components: {
    NInput,
    NButton,
  },
  data() {
    return {
      themeOverrides: this.$root.$data.themeOverrides,
      buttonOverrides: {
        textColorHover: "#E77F7FFF",
        // textColorPressed: "#CE5A5AFF",
        // textColorFocus: "#E77F7FFF",
        textColorTextHover: "#E77F7FFF",
        textColorTextPressed: "#FFFFFF",
      },
      title: "",
      content: "",
    };
  },
  methods: {
    addStory() {
      console.log("hiiii");
      try {
        fetch("/api/data/newstory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: this.title, content: this.content }),
        }).then(() => {
          this.title = "";
          this.content = "";
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style scoped>
h2 {
  color: var(--color-heading);
  font-weight: 500;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
