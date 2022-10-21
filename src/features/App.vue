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

.checkbox-element {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.5s;
    position: relative;
}

.checkbox-element input[checked] {
    background: #2e4054;
    color: #ffffff;
}
.checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
    transition: all 0.5s;
    margin-bottom: 32px;
}
.checkbox + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
}
.checkbox + label::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 2px solid #b8c1cc;
    border-radius: 8px;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
    transition: all 0.5s;
}

.checkbox:checked + label::before {
    border-color: #2e4054;
    background-color: #2e4054;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    transition: all 0.5s;
}
.checkbox:not(:disabled):not(:checked) + label:hover::before {
    border-color: #2e4054;
    transition: all 0.5s;
}
.checkbox:not(:disabled):active + label::before {
    background-color: #2e405409;
    border-color: #2e405409;
    transition: all 0.5s;
}
.checkbox:focus + label::before {
    box-shadow: 0 0 0 0.2rem #2e405411;
    transition: all 0.3s;
}
.checkbox:focus:not(:checked) + label::before {
    border-color: #2e405457;
    transition: all 0.3s;
}
.checkbox:disabled + label::before {
    background-color: #b8c1cc;
    transition: all 0.3s;
}

input[type="text"], input[type="password"] {
    box-sizing: border-box;
    padding: 12px;
    font-size: 20px;
    border: 2px solid #b8c1cc;
    border-radius: 12px;
    width: 200px;
    height: 44px;
    /* background: #f2f3f5; */
    outline: none;
}
</style>
