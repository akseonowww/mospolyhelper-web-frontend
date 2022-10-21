<template>
    <button class="btn" @click="isVisible=!isVisible">Дополнительные параметры поиска</button>
    <br />
    <form class="searchForm" @submit.prevent="send" v-if="isVisible">
        <input type="text" placeholder="Направление" v-model.trim.lazy="direction" /> <br />
        <input type="text" placeholder="Профиль" v-model.trim.lazy="profile" /><br />
        <input type="text" placeholder="Группа" v-model.trim.lazy="group" /><br />
        <input type="checkbox" v-model="course" value="1" />1 курс<br />
        <input type="checkbox" v-model="course" value="2" />2 курс<br />
        <input type="checkbox" v-model="course" value="3" />3 курс<br />
        <input type="checkbox" v-model="course" value="4" />4 курс<br />
        <input type="checkbox" v-model="course" value="5" />5 курс<br />
        <input type="checkbox" v-model="course" value="6" />6 курс<br />
        Форма обучения<br />
        <input type="checkbox" value="Очная" v-model="form" />Очная<br />
        <input type="checkbox" value="Очно-заочная" v-model="form" />Очно-заочная<br />
        <input type="checkbox" value="Заочная" v-model="form" />Заочная<br />
        <button @click="">Применить</button>
        <button @click="$emit('stopSearch')" v-if="isSearch">Остановить поиск</button>
    </form>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    const SearchForm = defineComponent({
        props: {
            isSearch: Boolean,
        },
        emits: ["applied", "applyFilter", "stopSearch"],
        data() {
            return {
                isVisible: false,
                direction: "",
                profile: "",
                group: "",
                course: [],
                form: []
            }
        },
        methods: {
            send() {
                console.log("applied", this.direction, this.profile, this.group, this.course, this.form);
                this.$emit("applyFilter", this.direction, this.profile, this.group, this.course, this.form);
            }
        }
    });

    export default SearchForm;
</script>

<style scoped>
    * {
       box-sizing: border-box;
    }
    .btn {
        background-color: DodgerBlue; /* Blue background */
        border: none; /* Remove borders */
        color: white; /* White text */
        padding: 12px 16px; /* Some padding */
        font-size: 16px; /* Set a font size */
        cursor: pointer; /* Mouse pointer on hover */
        display: block;
    }
    .searchForm {
        float:left;
        background: #fff;
        box-shadow: 0 0 6px rgba(0,0,0,0.5);
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
        margin-right: 10px;
        padding: 10px;
        padding-bottom:20px;
        border-radius: 25px;
        min-width: 300px;
        max-width: 500px;
    }
</style>