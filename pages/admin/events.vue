<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { App, Divider } from 'ant-design-vue'
import type { Event } from '~/server/entities/event.entity'


const events = ref<Event[]>([])
const load = async () => {
  await useFetch("/api/event/all").then(({ data: { value } }) => events.value = value as any[])
}

const remove = async (id: number) => {
  await $fetch(`/api/event/${id}`, {
    method: 'DELETE'
  })
  load()
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
  load()
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
  <a-flex :justify="'end'" :align="'start'" class="w-full h-full">
    <div class="h-screen w-full">
    <a-table :size="'large'" :pagination="{ pageSize: 50 }" :columns="[
      { title: 'id', dataIndex: 'id', key: 'id' },
      { title: 'Название', dataIndex: 'title', key: 'title' },
      { title: 'Описание', dataIndex: 'description', key: 'description' },
      { title: 'Адрес', dataIndex: 'location', key: 'location' },
      { title: 'Дата начала', dataIndex: 'start', key: 'start' },
      { title: 'Дата кончала', dataIndex: 'end', key: 'end' },
      { title: 'Действия', key: 'actions' }
    ]" :dataSource="events" >
    <template #bodyCell="{ column, value }" >
      <a-button type="primary" danger @click="remove(value.id)" v-if="column.key == 'actions'">Удалить</a-button>
      <p v-else>{{ value }}</p>
    </template>  
  </a-table>
  </div>
  </a-flex>
</template>