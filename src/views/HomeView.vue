<template>
  <div class="home">
    <SelectSurah :lists="listsSelect" :config="config" @change-surah="ChangeSurah($event)"/>

    <ListsSurah :lists="listsSurah" :quranToShow="quranToShow" :config="config" @show-more="ShowMoreSurah" :surah="surah" @reload-change-surah="reloadChangeSurah"/>
  </div>
</template>

<script>
  import {onMounted, reactive, ref} from 'vue'
  import axios from 'axios'
  import {SelectSurah, ListsSurah} from '@/components'

  export default {
    name: 'HomeView',
    components: {
      SelectSurah,
      ListsSurah
    },

    setup(){
      onMounted(() => {
        QuranListSelect(),
        QuranSurahLists()
      })

      let url = process.env.VUE_APP_API_URL
      let listsSelect = ref([])
      let listsSurah = ref([])
      let quranToShow = ref(9)
      let totalSurah = ref(0)
      let surah = ref({})
      let config = reactive({
        loading: null,
        loading_more: null,
        error: null,
        change_surah: null
      })

      function QuranSurahLists(){
        config.loading = true
        axios.get(`${url}data`)
        .then(({data}) => {
          listsSurah.value = data
          totalSurah.value = listsSurah.value.length
          setTimeout(() => {
            config.loading = false
          }, 2500)
        })
        .catch(err => console.error(err.response))
      }

      function ShowMoreSurah(){
        config.loading_more = true
        setTimeout(() => {
          quranToShow.value+=3
          config.loading_more = false
        }, 1500)
      }

      function QuranListSelect(){
        config.loading = true
        axios
        .get(`${url}list-surah`)
        .then(({data}) => {
          listsSelect.value = data.data
          setTimeout(() => {
            config.loading = false
          }, 2500)
        })
        .catch(err => console.error(err.response))
      }

      function ChangeSurah(number){
        config.loading = true
        config.change_surah = true
        axios
        .get(`${url}quran/${number}`)
        .then(({data}) => {
          surah.value = data.data
          setTimeout(() => {
            config.loading = false
          }, 1500)
        })
        .catch(err => console.error(err.response))
      }

      function reloadChangeSurah(){
        config.change_surah = null
      }

      return {
        listsSelect,
        listsSurah,
        quranToShow,
        ChangeSurah,
        surah,
        config,
        ShowMoreSurah,
        reloadChangeSurah
      }

    }
  }
</script>
