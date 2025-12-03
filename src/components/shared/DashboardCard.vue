<script lang="ts">
import type { IconType } from '../../constantes/icon.constante';
import Card from './Card.vue';
import Row from './Row.vue';
import Tag from './Tag.vue';

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
            fromColor: {
                type: String,
                required: false,
                default: 'from-blue-200'
            },
            toColor: {
                type: String,
                required: false,
                default: 'to-blue-500'
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
            Tag,
        },
    }

</script>

<template>
    <!-- TODO: hover -->
    <Card>
        <article class="flex flex-col justify-between h-full">
            <section>
                <Row class="mb-10">
                    <template #left>
                        <p class="text-sm">{{ title }}</p>
                    </template>
                    <template #right>
                        <Tag
                            :content="icon"
                            :isIcon="true"
                            :fromColor="fromColor"
                            :toColor="toColor"
                            :isRounded="true"
                        />
                    </template>
                </Row>

                <span class="text-2xl text-gray-500 truncate block">
                    <strong class="text-black">{{ content }}</strong>
                    {{ content2 ? content2 : '' }}
                </span>
                
            </section>
            <p class="mt-4">
                <Tag
                    :content="delta"
                    :fromColor="fromColor"
                    :toColor="toColor"
                />
            </p>
            
        </article>
    </Card>
</template>

<style scoped></style>