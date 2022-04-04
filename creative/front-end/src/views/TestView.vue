<template>
  <h2>Once Upon a Time</h2>
  <h4>Part 1 ~ Jan 10, 2002</h4>

  <section>
    <p>
      It was a dark and stormy night. People were doing stuff It was a lot of
      fun and they had a really good time. The end It was a dark and stormy
      night. People were doing stuff It was a lot of fun and they had a really
      good time. The endIt was a dark and stormy night. People were doing stuff
      It was a lot of fun and they had a really good time. The endIt was a dark
      and stormy night. People were doing stuff It was a lot of fun and they had
      a really good time. The endIt was a dark and stormy night. People were
      doing stuff It was a lot of fun and they had a really good time. The endIt
      was a dark and stormy night. People were doing stuff It was a lot of fun
      and they had a really good time. The endIt was a dark and stormy night.
      People were doing stuff It was a lot of fun and they had a really good
      time. The endIt was a dark and stormy night. People were doing stuff It
      was a lot of fun and they had a really good time. The end
    </p>
    <p>
      It was a dark and stormy night. People were doing stuff It was a lot of
      fun and they had a really good time. The end It was a dark and stormy
      night. People were doing stuff It was a lot of fun and they had a really
      good time. The endIt was a dark and stormy night. People were doing stuff
      It was a lot of fun and they had a really good time. The endIt was a dark
      and stormy night. People were doing stuff It was a lot of fun and they had
      a really good time. The endIt was a dark and stormy night. People were
      doing stuff It was a lot of fun and they had a really good time. The endIt
      was a dark and stormy night. People were doing stuff It was a lot of fun
      and they had a really good time. The endIt was a dark and stormy night.
      People were doing stuff It was a lot of fun and they had a really good
      time. The endIt was a dark and stormy night. People were doing stuff It
      was a lot of fun and they had a really good time. The end
    </p>
  </section>
  <div class="options">
    <p>
      <span class="upvote-icon">👍</span> 123
      <span class="downvote-icon">👎</span> 2
    </p>

    <n-button ghost color="rgb(189, 107, 0)">View Comments</n-button>
    <n-button ghost color="rgb(189, 107, 0)">Add to Story</n-button>
  </div>
  <div class="comment-section">
    <h3>Comments</h3>
    <div class="new-comment">
      <div class="comment-input">
        <n-input
          size="small"
          v-model:value="value"
          type="text"
          placeholder="Name"
          :theme="darkTheme"
          :theme-overrides="themeOverrides"
        />
        <!-- <p></p> -->
        <!-- <br /> -->
        <n-input
          type="textarea"
          size="small"
          placeholder="Write a Comment"
          :autosize="{
            minRows: 3,
          }"
          :theme="darkTheme"
          :theme-overrides="themeOverrides"
        />
        <n-button ghost color="rgb(189, 107, 0)">Submit</n-button>
      </div>
    </div>

    <div class="comment">
      <div class="votes">
        <span class="upvote-icon">👍</span>
        <p>123</p>
        <span class="downvote-icon">👎</span>
      </div>
      <div class="comment-content">
        <h3>Bobbery</h3>
        <p>Good Story</p>
      </div>
    </div>
  </div>
  <h4>Part 2 ~ Jan 12, 2022</h4>
  <section>
    <p>
      It was a dark and stormy night. People were doing stuff It was a lot of
      fun and they had a really good time. The end It was a dark and stormy
      night. People were doing stuff It was a lot of fun and they had a really
      good time. The endIt was a dark and stormy night. People were doing stuff
      It was a lot of fun and they had a really good time. The endIt was a dark
      and stormy night. People were doing stuff It was a lot of fun and they had
      a really good time. The endIt was a dark and stormy night. People were
      doing stuff It was a lot of fun and they had a really good time. The endIt
      was a dark and stormy night. People were doing stuff It was a lot of fun
      and they had a really good time. The endIt was a dark and stormy night.
      People were doing stuff It was a lot of fun and they had a really good
      time. The endIt was a dark and stormy night. People were doing stuff It
      was a lot of fun and they had a really good time. The end
    </p>
    <p>
      It was a dark and stormy night. People were doing stuff It was a lot of
      fun and they had a really good time. The end It was a dark and stormy
      night. People were doing stuff It was a lot of fun and they had a really
      good time. The endIt was a dark and stormy night. People were doing stuff
      It was a lot of fun and they had a really good time. The endIt was a dark
      and stormy night. People were doing stuff It was a lot of fun and they had
      a really good time. The endIt was a dark and stormy night. People were
      doing stuff It was a lot of fun and they had a really good time. The endIt
      was a dark and stormy night. People were doing stuff It was a lot of fun
      and they had a really good time. The endIt was a dark and stormy night.
      People were doing stuff It was a lot of fun and they had a really good
      time. The endIt was a dark and stormy night. People were doing stuff It
      was a lot of fun and they had a really good time. The end
    </p>
  </section>
</template>

<script>
// console.log(this.$root.test);
import { defineComponent } from "vue";
import { NButton } from "naive-ui";
import { NInput } from "naive-ui";
import { darkTheme } from "naive-ui";

export default defineComponent({
  setup() {
    return {
      darkTheme,
    };
  },
  data() {
    return {
      themeOverrides: {
        caretColor: "var(--accent-color)",
        boderColor: "var(--accent-color)",
        borderFocus: "var(--accent-color)",
        borderHover: "1px solid var(--accent-color)",
        borderFocus: "1px solid var(--accent-color)",
        // colorFocus: "rgb(189, 107, 0)"
        boxShadowFocus: "0 0 8px 0 var(--accent-color)",
        border: "0px solid #000000",
      },
    };
  },

  components: {
    NButton,
    NInput,
  },
});
</script>

<style scoped>
.comment-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* justify-content: space-around; */
}
.new-comment {
  display: flex;
  /* align-items: center; */
  gap: 8px;
  /* width: 80rem; */
  /* width: 100%; */
  /* padding: 0.8rem; */
  padding: 0.6rem;
}
.options {
  padding: 5px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.comment {
  /* background-color: var(--color-background-secondary); */
  display: flex;
  /* margin-left: 4rem; */
}
.comment-content {
  padding: 0.8rem;
  margin: 0.5rem;
  border-radius: 5px;
  border-color: var(--color-border-light);
  border-style: solid;
  width: 100%;
}

.comment-section h3 {
  color: var(--color-heading);
  font-weight: 500;
}

.comment-content p {
  color: var(--color-text);
}

.votes {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.comment h3 {
  color: var(--color-heading);
  /* font-weight: 500; */
}

h2 {
  color: var(--color-heading);
  font-weight: 500;
}

h4 {
  font-size: 1rem;
  /* font-weight: 500; */
  margin-bottom: 0.4rem;
  color: var(--color-text);
}

section {
  background-color: var(--color-background-secondary);
  padding: 0.8rem;
  border-radius: 5px;
}

p {
  color: var(--color-story-text);
  line-height: 1.8rem;
}
</style>
