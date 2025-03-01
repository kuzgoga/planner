<script setup lang="ts">
useFetch("/api/event/managed").then(res => console.log(res.data.value))

const show = ref(false)

const data = reactive<{
  title: string,
  description: string,
  preview_path: string,
  location: string,
  start: Date,
  end: Date,
  participants: {id: number}[]
}>({
  title: "",
  description: '',
  preview_path: "asdasdasd",
  end: new Date,
  start: new Date,
  participants: [],
  location: ''
})

const users = useState<any[]>(() => [])
useFetch("/api/users").then(res => console.log(res.data.value))
</script>

<template>
  <a-float-button tooltip="Создать" @click="show = !show" />
  <a-flex v-if="show" :align="'center'" :justify="'center'" class="w-full h-full relative z-50">
    <a-form class="border border-gray-300 rounded-2xl w-[600px] h-[300px]" style="padding: 10px">
      <a-flex :justify="'space-between'" class="w-full h-full" vertical>
        <a-input placeholder="Название" v-model="data.title"></a-input>
        <a-input placeholder="Описание" v-model="data.description"></a-input>
        <a-date-picker show-time placeholder="Дата начала" v-model="data.start"></a-date-picker>
        <a-date-picker show-time placeholder="Дата кончала" v-model="data.end"></a-date-picker>
        <a-input placeholder="Адрес" v-model="data.location"></a-input>
        <a-button type="primary">Создать</a-button>
      </a-flex>
    </a-form>
  </a-flex>
</template>