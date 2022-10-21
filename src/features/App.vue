<template>
    <div id="app">
        <Header />
        <div id="main-view"><router-view /></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./common/components/Header.vue";

const App = defineComponent({
    components: {
        Header,
    },
});

export default App;
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.font-weighted-bold {
    font-weight: bold;
}

html {
    height: 100%;
    margin: 0px !important;
    padding: 0px !important;
}

body {
    font-family: Rubik, sans-serif;
    font-size: 16px;
    height: 100%;
    margin: 0px !important;
    padding: 0px !important;
    background-color: #fff;
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto;
    background-attachment: fixed;
}

@media screen and (max-width: 600px) {
    body {
        overflow-x: hidden;
        width: 100vw;
    }

    .scrollApp::-webkit-scrollbar {
        width: 8px; /* ширина scrollbar */
        height: 8px;
    }
    .scrollApp::-webkit-scrollbar-track {
        background: rgb(227, 227, 227); /* цвет дорожки */
    }
    .scrollApp::-webkit-scrollbar-thumb {
        background-color: rgba(118, 118, 118, 0.623); /* цвет плашки */
        border-radius: 20px; /* закругления плашки */
        border: 3px solid rgb(227, 227, 227); /* padding вокруг плашки */
    }
}

#main-view {
    margin-top: 60px;
}

@media screen and (max-width: 600px) {
    #main-view {
        margin-top: 0;
    }
}

.inline {
    display: inline;
}
</style>
