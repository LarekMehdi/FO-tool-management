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
        emits: ['update:display'],
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
            <article>
                <slot name="body"></slot>
            </article>
            <aside>
                <Row>
                    <template #right>
                        <ButtonCustom content="Filter"/>
                    </template>
                </Row>
            </aside>
        </template>
    </Drawer>
</template>

<style scoped></style>

