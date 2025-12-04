<script lang="ts">
import type { PropType } from 'vue';
import type { OptionSelectInterface } from '../../interfaces/input.interface';


    export default {
        data() {
            return {}
        },
        props: {
            modelValue: {
                type: [String, Number, null] as PropType<string | number | undefined>,
                required: true,
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
            validation: {
                type: Object,
                required: false,
            },
            inputClass: {
                type: String,
                required: false,
                default: 'px-3 py-2 border rounded-md w-full'
            },
            optionClass: {
                type: String,
                required: false,
                default: ''
            },
            labelClass: {
                type: String,
                required: false,
                default: 'text-left block'
            },
            displayLabel: {
                type: Boolean,
                required: false,
                default: true,
            },
            placeholder: {
                type: String,
                required: false,
                default: '',
            },
            options: {
                type: Array as PropType<OptionSelectInterface[]>,
                required: true,
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
            style="white-space: nowrap;"
        >
            {{ label }} {{ isRequired && displayLabel ? ' *' : '' }}
        </label>
        <select 
            :name="name"
            :class="[inputClass, (modelValue == null || modelValue === '') ? 'text-gray-400' : 'text-black']"
            :value="modelValue"
            :disabled="disabled"
            @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        >
            <option 
                v-if="placeholder"
                value=""
                disabled
                :selected="!modelValue"
                class="text-gray-400"
            >
                {{ placeholder }}
            </option>
            <option
                v-for="(option, index) in options"
                :key="index"
                :value="option.value"
                :class="optionClass"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
    
    <small v-if="validation?.$dirty && validation?.$error" class="text-red-500">
        {{ validation?.$errors[0]?.$message }}
    </small>

</template>