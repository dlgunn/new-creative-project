<template>
  <div class="top-part">
    <h2>{{ data.stories[indexOfStory].title }}</h2>

    <n-dropdown
      trigger="hover"
      :options="options"
      @select="changeSelection"
      :theme="darkTheme"
    >
      <n-button ghost color="rgb(189, 107, 0)">Select Story</n-button>
    </n-dropdown>
  </div>

  <template v-for="(part, key) in data.stories[indexOfStory].parts">
    <h4>Part {{ key + 1 }}</h4>
    <section>
      <p v-for="paragraph in part.content">{{ paragraph }}</p>
    </section>
    <div class="options">
      <p>
        <n-button
          @click="
            upvoteSection(
              indexOfStory,
              key,
              data.stories[indexOfStory]._id,
              part._id
            )
          "
          text
          ghost
          color="rgb(189, 107, 0)"
          >👍</n-button
        >{{ part.upvotes }}
        <n-button
          @click="
            downvoteSection(
              indexOfStory,
              key,
              data.stories[indexOfStory]._id,
              part._id
            )
          "
          text
          ghost
          color="rgb(189, 107, 0)"
          >👎</n-button
        >{{ part.downvotes }}
      </p>

      <n-button
        @click="addToShown(indexOfStory, key)"
        ghost
        color="rgb(189, 107, 0)"
        >{{ commentKey(checkIfShown(indexOfStory, key)) }} Comments</n-button
      >
      <!-- <n-button
          @click="addSection(indexOfStory), key)"
          ghost
          color="rgb(189, 107, 0)"
          >Add to Story</n-button
        > -->
      <n-button
        @click="toggleEdit(indexOfStory, key)"
        ghost
        color="rgb(189, 107, 0)"
        >{{
          checkIfEditing(indexOfStory, key) ? "Hide edit" : "Edit part"
        }}</n-button
      >
    </div>
    <template v-if="checkIfEditing(indexOfStory, key)">
      <div class="edit-area">
        <h3>Edit</h3>
        <n-input
          type="textarea"
          size="small"
          @blur="updateEditing($event, key)"
          :default-value="part.content"
          placeholder="Write!"
          :autosize="{
            minRows: 8,
          }"
          :theme="darkTheme"
          :theme-overrides="themeOverrides"
        />
        <n-button
          @click="
            updateSection(
              indexOfStory,
              key,
              data.stories[indexOfStory]._id,
              part._id
            )
          "
          ghost
          color="rgb(189, 107, 0)"
          >Post Edit!</n-button
        >
      </div>
    </template>
    <template v-if="checkIfShown(indexOfStory, key)">
      <div class="comment-section">
        <h3>Comments</h3>
        <div class="new-comment">
          <div class="comment-input">
            <n-input
              size="small"
              @blur="updateName($event, key)"
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
              @blur="updateComment($event.target.value, key)"
              placeholder="Write a Comment"
              :autosize="{
                minRows: 3,
              }"
              :theme="darkTheme"
              :theme-overrides="themeOverrides"
            />
            <n-button
              @click="
                addComment(
                  indexOfStory,
                  key,
                  data.stories[indexOfStory]._id,
                  part._id,
                  $event
                )
              "
              ghost
              color="rgb(189, 107, 0)"
              >Submit</n-button
            >
          </div>
        </div>

        <div v-for="(comment, commentNum) in part.comments" class="comment">
          <div class="votes">
            <!-- <span
              @click="
                upvoteComment(
                  indexOfStory,
                  key,
                  data.stories[indexOfStory]._id,
                  part._id
                )
              "
              class="upvote-icon"
              >👍</span
            >
            <p>{{ comment.upvotes }}</p>
            <span class="downvote-icon">👎</span> -->
          </div>
          <div class="comment-content">
            <div class="comment-words">
              <h3>{{ comment.name }}</h3>
              <p>{{ comment.comment }}</p>
            </div>
            <n-button
              @click="
                removeComment(
                  indexOfStory,
                  key,
                  commentNum,
                  data.stories[indexOfStory]._id,
                  part._id,
                  comment._id
                )
              "
              :theme-overrides="buttonOverrides"
              text
            >
              <n-icon size="18">
                <trash-alt></trash-alt>
              </n-icon>
            </n-button>
          </div>
        </div>
      </div>
    </template>
  </template>
  <div class="edit-area">
    <h3>Add the next part of the story!</h3>
    <n-input
      type="textarea"
      size="small"
      @blur="addSection($event)"
      placeholder="Write!"
      :autosize="{
        minRows: 10,
      }"
      :theme="darkTheme"
      :theme-overrides="themeOverrides"
    />
    <n-message-provider>
      <n-dialog-provider>
        <n-button
          @click="submitAddition(data.stories[indexOfStory]._id)"
          ghost
          color="rgb(189, 107, 0)"
          >Submit addition</n-button
        >
      </n-dialog-provider>
    </n-message-provider>
  </div>

  <!-- <br /> -->
  <!-- <br /> -->

  <!-- <div class="edit-area">
    <h3>Add the next part of the story!</h3>
    <n-input
      type="textarea"
      size="small"
      v-model:value="newSection"
      placeholder="Write!"
      :autosize="{
        minRows: 10,
      }"
      :theme="darkTheme"
      :theme-overrides="themeOverrides"
    />
    <n-button @click="submitAddition()" ghost color="rgb(189, 107, 0)"
      >Submit addition</n-button
    >
  </div> -->
</template>

<script>
// console.log(this.$root.test);
import { defineComponent } from "vue";
import { NButton } from "naive-ui";
import { NInput } from "naive-ui";
import { darkTheme } from "naive-ui";
import { data } from "../javascript/test";
import { TrashAlt } from "@vicons/fa";
import { Icon } from "@vicons/utils";
import { NIcon } from "naive-ui";
// import { useMessage } from "naive-ui";
import { NMessageProvider } from "naive-ui";
import { NDialogProvider } from "naive-ui";
import { NDropdown } from "naive-ui";
// import { App } from "../App.vue";

export default defineComponent({
  setup() {
    // window.$message = useMessage();
    return {
      info() {
        message.info("helloooo");
      },
      darkTheme,
    };
  },
  data() {
    return {
      // options: [
      //   {
      //     label: "Yuppp",
      //     key: "yuppp",
      //   },
      //   {
      //     label: "YAYYY",
      //     key: "YAYYYY",
      //   },
      // ],
      test: "",
      options: [],
      themeOverrides: this.$root.$data.themeOverrides,
      buttonOverrides: {
        textColorHover: "#E77F7FFF",
        // textColorPressed: "#CE5A5AFF",
        // textColorFocus: "#E77F7FFF",
        textColorTextHover: "#E77F7FFF",
        textColorTextPressed: "#FFFFFF",
      },
      newSection: "",
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
      selection: "",
      indexOfStory: 0,
    };
  },
  computed: {
    // indexOfStory() {
    //   let index = this.data.stories.findIndex((story) => {
    //     console.log(story._id);
    //     return story._id == this.selection;
    //   });
    //   console.log(`Index is ${index}`);
    //   return index;
    // },
    // storyData: function () {
    //   // console.log(this.$root.$data.data);
    //   this.$root.$emit("myemit");
    // },
    // options: async function () {
    //   let tempData = await this.getData();
    //   let array = [];
    //   for (let story in tempData.stories) {
    //     array.push({ label: story.title, key: story.title });
    //   }
    //   return array;
    // },
  },
  created() {
    this.getData();
    // this.getOptions();
    // this.setSelection();
  },

  methods: {
    editValue(indexOfStory, key) {
      return this.isShown[indexOfStory][key].content;
    },
    updateName(event, key) {
      this.isShown[this.indexOfStory][key].name = event.target.value;
      console.log(event.target.value);
    },
    updateEditing(event, key) {
      this.isShown[this.indexOfStory][key].content = event.target.value;
    },
    updateComment(value, key) {
      this.isShown[this.indexOfStory][key].comment = value;
    },
    addSection(event) {
      this.newSection = event.target.value;
    },
    setSelection() {
      if (!this.data.stories[0]) {
        console.log("Nothing here");
        return;
      }
      if (!this.data.stories[0]._id) {
        return;
      }
      this.selection = this.data.stories[0]._id;
      let index = this.data.stories.findIndex((story) => {
        return story._id == this.selection;
      });
      this.indexOfStory = index;
    },
    changeSelection(key, num) {
      this.selection = key;
      let index = this.data.stories.findIndex((story) => {
        return story._id == this.selection;
      });
      this.indexOfStory = index;
    },
    getOptions() {
      let tempData = this.data;
      let array = [];
      tempData.stories.forEach((story) =>
        array.push({ label: story.title, key: story._id })
      );
      this.options = array;
    },
    async getData() {
      try {
        // let response = await fetch("/api/data");
        // response
        let response = await fetch("/api/data");
        let data = await response.json();
        this.setSelection();
        // console.log(data);
        this.data = data[0];
        this.getOptions();
        this.setSelection();

        return data[0];
        // .then((response) => {
        //   response.json();
        //   console.log(JSON.stringify(response));
        // })
        // .then((data) => {
        //   this.data = data;
        //   console.log(data);
        // })
        // .catch((error) => console.log(error));
        // this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    // please: function () {
    //   // this.$root.test();
    // },
    downvoteSection(storyNum, sectionNum, storyId, sectionId) {
      fetch(`/api/data/parts/downvote/${storyId}/${sectionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      }).catch((error) => {
        console.log("Error:", error);
      });
      this.data.stories[storyNum].parts[sectionNum].downvotes++;
    },
    upvoteSection(storyNum, sectionNum, storyId, sectionId) {
      fetch(`/api/data/parts/upvote/${storyId}/${sectionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      }).catch((error) => {
        console.log("Error:", error);
      });
      this.data.stories[storyNum].parts[sectionNum].upvotes++;
    },
    updateSection(storyNum, sectionNum, storyId, sectionId) {
      if (!this.isShown[storyNum][sectionNum].content) {
        console.log("The story is empty!");
        return;
      }
      if (this.isShown[storyNum][sectionNum].content.length < 200) {
        alert("Story sections must be longer than 200 characters");
        return;
      }
      let data = {
        content: this.isShown[storyNum][sectionNum].content,
      };
      fetch(`/api/data/parts/${storyId}/${sectionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => {
        console.log("Error:", error);
      });
      this.data.stories[storyNum].parts[sectionNum].content = [
        this.isShown[storyNum][sectionNum].content,
      ];
      this.toggleEdit(storyNum, sectionNum);
    },
    removeComment(
      storyNum,
      sectionNum,
      commentNum,
      storyId,
      sectionId,
      commentId
    ) {
      console.log("here");
      fetch(`/api/data/parts/${storyId}/${sectionId}/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storyIndex: storyNum,
          sectionIndex: sectionNum,
        }),
      })
        .then(() => {})
        .catch((error) => {
          console.log("Error:", error);
        });
      this.data.stories[storyNum].parts[sectionNum].comments.splice(
        commentNum,
        1
      );
    },
    submitAddition(storyid) {
      if (this.newSection.length < 200) {
        alert("Story sections must be longer than 200 characters");
        return;
      }
      if (!this.newSection) {
        console.log("There's nothing here");
      }

      fetch(`/api/data/add/${storyid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: this.newSection }),
      })
        .then(() => window.location.reload())
        .catch((error) => {
          console.log("Error:", error);
        });
    },
    addComment(storyNum, sectionNum, storyId, sectionId, event) {
      console.log("Adding Comment");
      if (
        !this.isShown[storyNum][sectionNum].name ||
        !this.isShown[storyNum][sectionNum].comment
      ) {
        return;
      }
      console.log("hello");
      let data = {
        name: this.isShown[storyNum][sectionNum].name,
        comment: this.isShown[storyNum][sectionNum].comment,
        upvotes: 0,
      };

      // this.isShown[this.indexOfStory][key].comment = "";
      // this.isShown[this.indexOfStory][key].name = "";

      // console.log(data);
      fetch(`/api/data/${storyId}/${sectionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => {
        console.log("Error:", error);
      });
      this.data.stories[storyNum].parts[sectionNum].comments.unshift(data);
    },
    toggleEdit(storyNum, part) {
      if (!this.isShown[storyNum]) {
        this.isShown[storyNum] = {};
      }
      if (!this.isShown[storyNum][part]) {
        this.isShown[storyNum][part] = {
          name: "",
          comment: "",
          show: false,
          edit: true,
          content: this.data.stories[storyNum].parts[part].content[0],
        };
        return;
      }
      this.isShown[storyNum][part].edit = !this.isShown[storyNum][part].edit;
      return;
    },
    addToShown(storyNum, part) {
      if (!this.isShown[storyNum]) {
        this.isShown[storyNum] = {};
      }
      if (!this.isShown[storyNum][part]) {
        this.isShown[storyNum][part] = {
          name: "",
          comment: "",
          show: true,
          edit: false,
          content: this.data.stories[storyNum].parts[part].content[0],
        };
        return;
      }
      this.isShown[storyNum][part].show = !this.isShown[storyNum][part].show;
      // this.isShown[storyNum] = {};
      // this.isShown[storyNum][part] = true;
      console.log(this.isShown);
      return;
    },
    checkIfEditing(storyNum, part) {
      if (!this.isShown[storyNum]) {
        return false;
      }
      if (!this.isShown[storyNum][part]) {
        return false;
      }
      if (!this.isShown[storyNum][part].edit) {
        return false;
      }
      return true;
    },
    checkIfShown(storyNum, part) {
      if (!this.isShown[storyNum]) {
        return false;
      }
      if (!this.isShown[storyNum][part]) {
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
    NIcon,
    Icon,
    TrashAlt,
    NButton,
    NInput,
    NMessageProvider,
    NDialogProvider,
    NDropdown,
  },
});
</script>

<style scoped>
.top-part {
  display: flex;
  gap: 30px;
  align-items: center;
  /* justify-content: space-between; */
}
.comment-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* justify-content: space-around; */
}

.edit-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.edit-area h3 {
  color: var(--color-heading);
  font-weight: 500;
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
  display: flex;
  justify-content: space-between;
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

.trash-icon :hover {
  color: red;
  transition: 20000ms;
}
</style>
