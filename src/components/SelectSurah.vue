<template>
	<div>
		<div class="col-lg-12 col-sm-12 col__select-surah">
			<h1>AlQuran Application</h1>
		</div>
		<div class="col-lg-12 col-sm-12 col__option-surah">
			<select v-if="config.loading" class="form-select" aria-label="Default select example">
				<option>
					<div class="spinner-border spinner-border-sm" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</option>
			</select>

			<select v-else class="form-select" aria-label="Default select example" @change="changeSurah($event)">
				<option selected>Filter surah</option>
				<option v-for="(item, index) in filteredSurah" :value="item.number" :key="index+1">
					{{item.list.transliteration.id}}
				</option>
			</select>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			lists: Array,
			config: Object
		},

		methods: {
			changeSurah(e){
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