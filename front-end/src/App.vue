<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import { defineComponent } from "vue";
</script>

<template>
  <header>
    <!-- <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    /> -->

    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->
      <h1>Storywriter</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/test">Test</RouterLink>
      </nav>
    </div>
  </header>
  <div class="content-wrapper">
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script>
export default {
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
      test: "test",
    };
  },
};
// export default defineComponent({});
</script>

<style>
@import "@/assets/base.css";

.wrapper nav {
  background-color: var(--color-border);
  padding: 5px;
  border-radius: 10px;
}

.wrapper h1 {
  color: var(--color-heading);
  font-weight: 700;
}

.content-wrapper {
  margin-left: auto;
  margin-right: auto;
  /* margin: 0px !important; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  max-width: 50rem;
}

.content {
  width: 100%;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  /* padding: 2rem; */

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 2rem;
}

p {
  margin-bottom: 0.3rem;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: var(--link-color);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    /* text-decoration: underline; */
    background-color: var(--link-hover-color);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/* @media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
