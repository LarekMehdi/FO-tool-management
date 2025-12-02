<script lang="ts">
import type { IconType } from '../../constantes/icon.constante';
import Card from './Card.vue';
import Row from './Row.vue';

    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            icon: {
                type: String as () => IconType,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            content2: {
                type: String,
                required: false
            },
            delta: {
                type: String,
                required: true
            }
        },
        components: {
            Card,
            Row,
        },
    }

</script>

<template>
    <Card>
        <article class="flex flex-col justify-between h-full">
            <section>
                <Row class="mb-10">
                    <template #left>
                        <p>{{ title }}</p>
                    </template>
                    <template #right>
                        <i :class="`pi pi-${icon}`"></i>
                    </template>
                </Row>

                <span>
                    <strong class="text-2xl">{{ content }}</strong>
                    {{ content2 ? content2 : '' }}
                </span>
            </section>
            
            <p class="mt-4">{{ delta }}</p>
            
        </article>
    </Card>
</template>

<style scoped></style>