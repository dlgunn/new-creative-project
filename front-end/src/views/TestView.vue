<template>
  <template v-for="(story, number) in this.$root.$data.data.stories">
    <h2>{{ story.title }}</h2>
    <template v-for="(part, key) in story.parts">
      <h4>Part {{ key + 1 }} ~ {{ part.date }}</h4>
      <section>
        <p v-for="paragraph in part.content">{{ paragraph }}</p>
      </section>
      <div class="options">
        <p>
          <span class="upvote-icon">👍</span> {{ part.upvotes }}
          <span class="downvote-icon">👎</span> {{ part.downvotes }}
        </p>

        <n-button
          @click="addToShown(number, key)"
          ghost
          color="rgb(189, 107, 0)"
          >{{ commentKey(checkIfShown(number, key)) }} Comments</n-button
        >
        <n-button ghost color="rgb(189, 107, 0)">Add to Story</n-button>
      </div>
      <template v-if="checkIfShown(number, key)">
        <div class="comment-section">
          <h3>Comments</h3>
          <div class="new-comment">
            <div class="comment-input">
              <n-input
                size="small"
                v-model:value="isShown[number][key].name"
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
                v-model:value="isShown[number][key].comment"
                placeholder="Write a Comment"
                :autosize="{
                  minRows: 3,
                }"
                :theme="darkTheme"
                :theme-overrides="themeOverrides"
              />
              <n-button
                @click="addComment(number, key, story._id, part._id)"
                ghost
                color="rgb(189, 107, 0)"
                >Submit</n-button
              >
            </div>
          </div>

          <div v-for="comment in part.comments" class="comment">
            <div class="votes">
              <span class="upvote-icon">👍</span>
              <p>{{ comment.upvotes }}</p>
              <span class="downvote-icon">👎</span>
            </div>
            <div class="comment-content">
              <h3>{{ comment.name }}</h3>
              <p>{{ comment.comment }}</p>
            </div>
          </div>
        </div>
      </template>
    </template>
    <br />
    <br />
  </template>
  <h2 @click="test()">Once Upon a Time</h2>
  <h4>Part 1 ~ Jan 10, 2002</h4>
</template>

<script>
// console.log(this.$root.test);
import { defineComponent } from "vue";
import { NButton } from "naive-ui";
import { NInput } from "naive-ui";
import { darkTheme } from "naive-ui";
import { data } from "../javascript/test";
// import { App } from "../App.vue";

export default defineComponent({
  setup() {
    return {
      darkTheme,
    };
  },
  data() {
    return {
      themeOverrides: this.$root.$data.themeOverrides,
      // themeOverrides: {
      //   caretColor: "var(--accent-color)",
      //   boderColor: "var(--accent-color)",
      //   borderFocus: "var(--accent-color)",
      //   borderHover: "1px solid var(--accent-color)",
      //   borderFocus: "1px solid var(--accent-color)",
      //   // colorFocus: "rgb(189, 107, 0)"
      //   boxShadowFocus: "0 0 8px 0 var(--accent-color)",
      //   border: "0px solid #000000",
      // },
      data,
      isShown: {},
      tempCommentVals: [],
    };
  },
  computed: {
    // storyData: function () {
    //   // console.log(this.$root.$data.data);
    //   this.$root.$emit("myemit");
    // },
  },

  methods: {
    // please: function () {
    //   // this.$root.test();
    // },
    addComment(storyNum, sectionNum, storyId, sectionId) {
      if (
        !this.isShown[storyNum][sectionNum].name ||
        !this.isShown[storyNum][sectionNum].comment
      ) {
        return;
      }
      let data = {
        name: this.isShown[storyNum][sectionNum].name,
        comment: this.isShown[storyNum][sectionNum].comment,
        upvotes: 0,
      };
      // console.log(data);
      fetch(`http://localhost:3001/api/data/${storyId}/${sectionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => resonse.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
      // console.log("trying to update");
      // this.$root.$emit("update-event");
      // getData().then((response) => console.log(response));
      // console.log("hopefully updated");
    },
    // updateData: function () {
    //   this.data = this.$root.updateData;
    // },
    // test(id) {
    //   // console.log("hello");
    //   // console.log(`data is ${this.$root.$data.values}`);
    //   // console.log(`better data is ${this.$root.$data.theData}`);
    //   // // console.log();
    //   // const data = { name: "example" };
    //   // console.log(this.data);
    //   let data = { name: "bob", comment: "It worked!", upvotes: 20 };
    //   console.log(id);
    //   fetch(`http://localhost:3001/api/data/${id}/123`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("Success:", data);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    //   return;

    //   fetch("http://localhost:3001/api/test", {
    //     // mode: "no-cors",
    //     method: "POST", // or 'PUT'
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("Success:", data);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // },
    addToShown(storyNum, part) {
      if (!this.isShown[storyNum]) {
        this.isShown[storyNum] = {};
      }
      if (!this.isShown[storyNum][part]) {
        this.isShown[storyNum][part] = { name: "", comment: "", show: true };
        return;
      }
      this.isShown[storyNum][part].show = !this.isShown[storyNum][part].show;
      // this.isShown[storyNum] = {};
      // this.isShown[storyNum][part] = true;
      console.log(this.isShown);
      return;
    },
    checkIfShown(storyNum, part) {
      if (!this.isShown[storyNum]) {
        return false;
      }
      if (!this.isShown[storyNum][part].show) {
        return false;
      }
      return true;
    },
    commentKey(isTrue) {
      if (!isTrue) {
        return "View";
      }
      return "Hide";
    },
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
