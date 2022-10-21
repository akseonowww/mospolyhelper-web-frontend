<template>
    <div class="home">
        Исходный код:<br />
        Фронтэнд:
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/mospolyhelper/mospolyhelper-web-frontend"
            >github.com/mospolyhelper/mospolyhelper-web-frontend</a
        ><br />
        Бэкэнд:
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/mospolyhelper/mospolyhelper-web-backend"
            >github.com/mospolyhelper/mospolyhelper-web-backend</a
        ><br />
        <br />
        Готовое приложение:<br />
        Фронтэнд:
        <a target="_blank" rel="noopener noreferrer" href="https://mospolyhelper.github.io/">mospolyhelper.github.io</a
        ><br />
        Бэкэнд:
        <a target="_blank" rel="noopener noreferrer" href="https://mospolyhelper.herokuapp.com/"
            >mospolyhelper.herokuapp.com</a
        ><br />
        <br />
        Мобильное приложение:<br />
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/store/apps/details?id=com.mospolytech.mospolyhelper"
            >Google Play</a
        ><br />
        <br />
        Соцсети:<br />
        <a target="_blank" rel="noopener noreferrer" href="https://vk.com/mospolyhelper">Группа Вконтакте</a><br />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const Home = defineComponent({});

export default Home;
</script>

<style scoped>
.home {
    padding-left: 100px;
    padding-top: 50px;
    font-size: 24px;
}
@media screen and (max-width: 600px) {
    .home {
        font-size: 16px;
        padding: 0 2em;
    }
}
</style>
