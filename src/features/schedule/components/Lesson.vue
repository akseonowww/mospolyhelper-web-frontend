<template>
    <div class="time" v-if="!previousEqual">{{ getTime() }}</div>
    <div class="lesson">
        <div class="type"
             v-bind:class="[isImportant(type) ? 'important' : 'not-important']">{{type}}</div>
        <div class="title">{{title}}</div>
        <!-- <div v-if="groups">{{groups}}</div> -->
        <div class="auditorium" v-html="auditorium"></div>
        <div class="teacher">{{teacher}}</div>
        <div class="date">{{getFormattedDate(dateFrom, dateTo)}}</div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import LessonTimes from '@/domain/schedule/utils/lessonTimes'
    import { isImportant } from '@/domain/schedule/utils/lessonUtils'
import { strict } from "assert";

    const lesson = defineComponent({
        props: {
            previousEqual: Boolean,
            order: Number,
            title: String,
            type: String || undefined,
            teacher: String,
            groups: String,
            auditorium: String,
            dateFrom: Date,
            dateTo: Date
        },
        methods: {
            getTime() {
                const times = LessonTimes.getTime(this.order!, false);
                return this.order! + 1 + ') ' + times[0] + ' - ' + times[1];
            },
            getFormattedDate(date1: any, date2: any) {
                const moment = require('moment');
                if (date1.getTime() == date2.getTime()) {
                    return moment(date1).format('D MMMM');
                } else {
                    return moment(date1).format('D MMMM') + ' - ' + moment(date2).format('D MMMM');
                }
            },
            isImportant(type: any): boolean {
                return isImportant(type);
            }
        }
    }
);

export default lesson;
</script>

<style scoped>
.lesson {
    padding: 12px 16px 8px;
    min-width: 200px;
}
.time {
    font-size: 16px;
    background: #ededed;
    padding: 4px 6px;
}
.type {
    color: #4985a3;
    margin-bottom: 4px;
    border-radius: 10px;
    display: inline-block;
}
.type:before {
    content: "  \25CF  ";
}
.title {
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
}
.auditorium {
    padding: 4px 0 6px;
}
.date {
    color: rgba(0, 0, 0, 0.3);
    font-size: 12px;
}
.teacher {
    color: #ce8a5a;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 2px;
}

</style>

