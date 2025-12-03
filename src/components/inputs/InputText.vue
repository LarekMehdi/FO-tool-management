<script lang="ts">
import type { PropType } from 'vue';

    export default {
        data() {
            return {

            }
        },
        props: {
            modelValue: {
                type: String as PropType<string | undefined>,
                required: false,
            },
            label: {
                type: String,
                default: '',
                required: false,
            },
            name: {
                type: String,
                required: true,
            },
            placeholder: {
                type: String,
                default: '',
                required: false,
            },
            validation: {
                type: Object,
                required: false,
            },
            inputClass: {
                type: String,
                required: false,
                default: 'flex-1 px-3 py-1'
            },
            labelClass: {
                type: String,
                required: false,
                default: 'whitespace-nowrap'
            },
            displayLabel: {
                type: Boolean,
                required: false,
                default: true,
            },
            inline: {
                type: Boolean,
                required: false,
                default: false
            },
            isRequired: {
                type: Boolean,
                required: false,
                default: false,
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false,
            },
            readonly: {
                type: Boolean,
                required: false,
                default: false,
            },
            symbol: {
                type: String,
                required: false,
                default: '',
            },
        },
        emits: ['update:modelValue'],
    }
</script>

<template>
    <div :class="inline ? 'flex items-center gap-2 w-full' : 'w-full'">
        <label 
            v-if="displayLabel" 
            :for="name" 
            :class="labelClass"
        >
            {{ label }} {{ isRequired && displayLabel ? ' *' : '' }}
        </label>
        <aside class="flex items-center border rounded-lg overflow-hidden w-full">
            <input
                type="text"
                :name="name"
                :placeholder="placeholder"
                :class="`${inputClass} pl-4 flex-1`"
                :value="modelValue"
                :disabled="disabled"
                :readonly="readonly"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            />
            <span v-if="symbol" class="px-2 border-l">{{ symbol }}</span>
        </aside>
        
    </div>
    
    <small v-if="validation?.$dirty && validation?.$error" class="text-red-500">
        {{ validation?.$errors[0]?.$message }}
    </small>

</template>