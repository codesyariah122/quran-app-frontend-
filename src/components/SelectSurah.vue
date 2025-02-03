<template>
	<div>
		<div class="col-lg-12 col-sm-12 col__select-surah">
			<h1>AlQuran Application</h1>
			<img :src="require('@/assets/logo.png')" class="img-fluid">
		</div>
		<div class="col-lg-12 col-sm-12 col__option-surah">
			<select v-if="config.loading" class="form-select" aria-label="Default select example">
				<option>
					<div class="spinner-border spinner-border-sm" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</option>
			</select>

			<select v-else class="form-select" aria-label="Default select example" @change="changeSurah($event)" v-model="selected">
				<option disabled value="">Filter surah</option>
				<option v-for="(item, index) in filteredSurah" :value="item?.number" :key="index+1">
					{{item?.number}} - {{item?.name?.transliteration?.id}}
				</option>
			</select>
		</div>
	</div>
</template>


<script>
	/**
   * @author Puji Ermanto <pujiermanto@gmail.com> 
   * */
	
	export default {
		props: {
			lists: Array,
			config: Object
		},

		data(){
			return {
				selected: '',
			default: true
			}
		},

		methods: {
			changeSurah(e){
				this.selected = e.target.value ? e.target.value : 'Filter Surah'
				this.default = false
				this.$emit('change-surah', e.target.value)
			}
		},

		computed: {
			filteredSurah(){
				return this.lists.map(d => d)
			}
		}
	}
</script>