<script lang="ts">
import type { PropType } from 'vue';
import type { ToolListFilter } from '../../interfaces/filter.interface';
import InputText from '../inputs/InputText.vue';
import FilterPanel from '../shared/FilterPanel.vue';
import InputNumber from '../inputs/InputNumber.vue';

    export default {
        props: {
            display: {
                type: Boolean,
                required: true,
            },
            filter: {
                type: Object as PropType<ToolListFilter>,
                required: true,
            }
        },
        emits: ['update:display', 'apply-filter'],
        methods: {
            handleApplyFilter() {
                this.$emit('apply-filter', this.filter);
                this.$emit('update:display', false);
            }
        },
        components: {
            FilterPanel,
            InputText,
            InputNumber,
        },
    }
</script>

<template>
    <FilterPanel :display="display" @update:display="$emit('update:display', $event)" @apply-filter="handleApplyFilter">
        <template #body>
           
            <section class="mb-5">
                <InputText
                    v-model="filter.name"
                    name="name"
                    label="Name"
                    :inline="true"
                    :displayLabel="false"
                    placeholder="Name"
                />
            </section>
            <section class="mb-5">
                <InputText
                    v-model="filter.category"
                    name="category"
                    label="Category"
                    :inline="true"
                    :displayLabel="false"
                    placeholder="Category"
                />
            </section>
            <section class="mb-5">
                <InputText
                    v-model="filter.owner_department"
                    name="owner_department"
                    label="Department"
                    :inline="true"
                    :displayLabel="false"
                    placeholder="Owner Department"
                />
            </section>
            <section class="mb-5">
                <InputNumber
                    v-model="filter.monthly_cost_min"
                    name="monthly_cost_min"
                    label="Monthly Cost (min)"
                    :inline="true"
                    :displayLabel="false"
                    placeholder="Monthly Cost (min)"
                />
            </section>
            <section class="mb-5">
                <InputNumber
                    v-model="filter.monthly_cost_max"
                    name="monthly_cost_max"
                    label="Monthly Cost (max)"
                    :inline="true"
                    :displayLabel="false"
                    placeholder="Monthly Cost (max)"
                />
            </section>

            <!-- TODO: status -->
        </template>
    </FilterPanel>
</template>

<style scoped></style>