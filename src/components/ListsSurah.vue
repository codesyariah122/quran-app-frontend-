<template>
	<div class="mt-5 col-lg-12 col-sm-12">
		<div v-if="config.loading" class="row justify-content-center">
			<div class="col-lg-12 col-sm-12">
				<div class="spinner-border text-success" role="status" style="width: 5rem; height: 5rem;">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
		</div>
		
		<div v-else>
			<div v-if="config.change_surah" class="row justify-content-center">
				<div class="col-md-6 col-sm-12 col__surah-card">
					<div class="card">
						<div class="card-body">
							<div style="font-family: Avenir, Helvetica, Arial, sans-serif!important;" class="position-relative">
								<div style="cursor: pointer;" class="position-absolute top-0 end-0" @click="$emit('reload-change-surah')">
									<i class="far fa-lg fa-fw fa-window-close"></i>
								</div>
							</div>
							<h5 class="card-title">
								<span class="circle-number">{{surah.number}}</span> {{surah.name.short}}
							</h5>
							<h6 class="card-subtitle mb-2 text-muted">
								{{surah.name.transliteration.id}} - {{surah.name.translation.id}}
							</h6>
							<button @click="ToSurah(surah.number)" class="btn btn-dark rounded-pill">
								Baca Quran
							</button>
						</div>
					</div>
				</div>
			</div>

			<div v-else class="row justify-content-center">
				<div v-if="quranToShow <= lists.length" v-for="(surah, index) in quranToShow" class="col-md-4 col-sm-12 mb-3 col__surah-card">
					<div v-if="lists[index]" class="card">
						<div class="card-body">
							<h5 class="card-title">
								<span class="circle-number">{{lists[index].number}}</span> {{lists[index].name.short}}
							</h5>
							<h6 class="card-subtitle mb-2 text-muted">
								{{lists[index].name.transliteration.id}} - {{lists[index].name.translation.id}}
							</h6>
							
							<button @click="ToSurah(lists[index].number)" class="btn btn-dark rounded-pill btn-sm">
								Baca Quran
							</button>
						</div>
					</div>
				</div>

				<div v-if="config.loading_more" class="row justify-content-center">
					<div class="col-lg-12 col-sm-12">
						<div class="spinner-border text-success" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
				</div>

				<div v-if="quranToShow <= lists.length || lists.length > quranToShow" class="col-lg-12 col-sm-12 mt-3 mb-5">
					<div class="d-grid gap-2">
						<button @click="ShowMoreSurah" class="btn btn-success rounded-pill btn-block">
							<div v-if="loading_more">
								<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								Loading...
							</div>
							<span v-else>Load More Surah ...</span>
						</button>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		props: ['lists', 'surah', 'quranToShow', 'config'],

		methods: {
			ShowMoreSurah(){
				this.$emit('show-more')
			},

			ToSurah(val){
				this.$router.push(`/surah/${val}`)
			}
		}
	}
</script>