<template>
    <div class="dailySchedule">
        <div class="dayOfWeek">{{ getDayOfWeek(date) }}</div>
        <lesson
            v-for="(lesson, i) in dailySchedule"
            :previousEqual="i != 0 && dailySchedule[i - 1].order == lesson.order"
            :order="lesson.order"
            :title="lesson.title"
            :type="lesson.type"
            :teacher="getTeachers(lesson)"
            :groups="getGroups(lesson)"
            :auditorium="getAuditoriums(lesson)"
            :dateFrom="lesson.dateFrom"
            :dateTo="lesson.dateTo"
        ></lesson>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import lesson from "@/features/schedule/components/Lesson.vue";
import Lesson from "../../../domain/schedule/model/lesson";

const dailySchedule = defineComponent({
    props: {
        date: Date,
        dailySchedule: Array,
    },
    components: {
        lesson,
    },
    methods: {
        getTeachers(lesson: Lesson): string {
            return lesson.teachers.map((it) => it.names.join(" ")).join(", ");
        },
        getGroups(lesson: Lesson): string {
            return lesson.groups.map((it) => it.title).join(", ");
        },
        getAuditoriums(lesson: Lesson): string {
            return lesson.auditoriums.map((it) => it.title).join(", ");
        },
        getDayOfWeek(date: Date): string {
            const moment = require("moment");
            const res = moment(date).format("dddd, DD MMM");
            return res.charAt(0).toUpperCase() + res.slice(1);
        },
    },
});

export default dailySchedule;
</script>

<style scoped>
.dailySchedule {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
    border: 1px solid #b8c1cc9e;
    border-radius: 8px;
    padding-top: 12px;
}
@media screen and (max-width: 600px) {
    .dailySchedule {
        min-width: 70vw;
    }
}
.dayOfWeek {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
}
</style>
