<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { App } from 'ant-design-vue'

const events = ref<any[]>([])
const load = async () => {
  await useFetch("/api/event").then(({ data: { value } }) => console.log(value))
  console.log(events.value)
}

const show = ref(false)

const data = ref<{
  title: string,
  description: string,
  preview_path: string,
  location: string,
  start: string,
  end: string,
  participants: { id: number }[]
}>({
  title: "",
  description: '',
  preview_path: "asdasdasd",
  end: "",
  start: "",
  participants: [],
  location: ''
})

const filterOption = (input: any, option: any) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0

const users = useState<{ email: string, id: number }[]>(() => [])
useFetch<any>("/api/users").then(({ data: { value } }) => users.value = (value.users as any[]).map(el => ({ label: el.email, value: el.id, id: el.id, email: el.email })))


const create = async () => {
  useFetch("/api/event", {
    method: "POST",
    body: JSON.stringify(data.value)
  })
  show.value = false
}
load()
</script>

<template>
  <a-float-button tooltip="Создать" @click="show = !show" />
  <a-flex v-if="show" :align="'center'" :justify="'center'" class="w-full h-full relative z-50">
    <a-form class="border border-gray-300 rounded-2xl w-[600px] h-[300px]" style="padding: 10px">
      <a-flex :justify="'space-between'" class="w-full h-full" vertical>
        <a-input placeholder="Название" v-model:value="data.title"></a-input>
        <a-input placeholder="Описание" v-model:value="data.description"></a-input>
        <VueDatePicker placeholder="Дата начала" time-picker-inline v-model="data.start"></VueDatePicker>
        <VueDatePicker placeholder="Дата кончала" time-picker-inline v-model="data.end" :min-date="data.start"></VueDatePicker>
        <a-input placeholder="Адрес" v-model:value="data.location"></a-input>
        <a-select :filter-option v-model:value="<any[]>data.participants" mode="multiple" placeholder="Участники" :options="users"></a-select>
        <a-button type="primary" @click="create">Создать</a-button>
      </a-flex>
    </a-form>
  </a-flex>
</template>