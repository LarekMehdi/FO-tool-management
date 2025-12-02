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
            iconColor: {
                type: String,
                required: false,
                default: 'bg-gray-200'
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
                            :color=iconColor
                            :isRounded="true"
                        />
                    </template>
                </Row>

                <span class="text-2xl text-gray-500">
                    <strong class="text-black">{{ content }}</strong>
                    {{ content2 ? content2 : '' }}
                </span>
            </section>
            <p class="mt-4">
                <Tag
                    :content="delta"
                    :color=iconColor
                />
            </p>
            
        </article>
    </Card>
</template>

<style scoped></style>