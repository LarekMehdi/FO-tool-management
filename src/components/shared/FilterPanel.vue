<script lang="ts">
import ButtonCustom from '../inputs/ButtonCustom.vue';
import Drawer from './Drawer.vue';
import Row from './Row.vue';



    export default {
        props: {
            display: {
                type: Boolean,
                required: true,
            },
            header: {
                type: String,
                required: false,
                default: 'Search'
            },
        },
        emits: ['update:display', 'apply-filter'],
        components: {
            Drawer,
            Row,
            ButtonCustom,
        },
    }
</script>

<template>
    <Drawer :display="display" :header="header" @update:display="$emit('update:display', $event)">
        <template #body>
            <article class="mt-5">
                <slot name="body"></slot>
            </article>
            <aside class="mt-10">
                <Row>
                    <template #right>
                        <ButtonCustom content="Filter" @click="$emit('apply-filter')"/>
                    </template>
                </Row>
            </aside>
        </template>
    </Drawer>
</template>

<style scoped></style>

