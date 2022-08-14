<template>
	<div class="surah__detail">
		<div class="col-lg-12 col-sm-12">
			<div class="d-grid gap-2">
				<button @click="$router.push({path: '/'}), setActive(1)" class="btn btn-back btn-sm rounded-pill circle">
					<i class="fas fa-lg fa-fw fa-arrow-left"></i> Back
				</button>
			</div>
		</div>
		<div class="card mt-4">
			<div class="card-body">
				<div v-if="config.loading" class="d-flex justify-content-center">
					<div class="spinner-border text-success" role="status" style="width: 5rem; height: 5rem;">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>
				<div v-else>
					<div v-if="preBismillah && config.current === 1" class="row justify-content-center">
						<div class="col-lg-12 col-sm-12">
							<h2>
								{{preBismillah.text.arab}}
							</h2>
							<span>
								{{preBismillah.text.transliteration.en}}
							</span>
							<blockquote class="mt-2 blockquote-footer">
								{{preBismillah.translation.id}}
							</blockquote>
							<!-- <audio class="mt-2" ref="player" controls>
								<source v-bind:src="preBismillah.audio.primary" type="audio/mp3"/>
							</audio> -->
						</div>
					</div>

					<div v-if="surah" class="row justify-content-center mt-5">
						<div v-if="surah.text" class="col-lg-12 col-sm-12 card-title">
							<h2>
								<span class="circle-number">
									{{surah.number.inSurah}}
								</span> {{surah.text.arab}} 
							</h2>
							<span>{{surah.text.transliteration.en}}</span>
							<blockquote class="mt-2 blockquote-footer">
								{{surah.translation.id}}
							</blockquote>
							<audio class="mt-2" ref="player" controls>
								<source v-bind:src="surah.audio.primary" type="audio/mp3"/>
							</audio>
						</div>
					</div>
				</div>
				<div v-if="surah" class="row justify-content-center mt-5">
					<div v-if="surah.text" class="col-lg-12 col-sm-12 card-title">
						<nav aria-label="Page navigation example mt-2">
							<ul class="pagination justify-content-center">
								<li :class="`page-item ${config.current === 1 ? 'disabled' : ''}`">
									<a @click="firstAyat" class="page-link" href="javascript:void(0)" aria-label="Previous">
										<span aria-hidden="true">&laquo;</span>
									</a>
								</li>
								<li :class="`page-item ${config.current === 1 ? 'disabled' : ''}`">
									<a @click="prevAyat(surah.number.inSurah-=1)" class="page-link" href="javascript:void(0)" tabindex="-1" aria-disabled="true">Previous</a>
								</li>

								<li :class="`page-item ${config.current == numberOfVerses ? 'disabled' : ''}`">
									<a @click="nextAyat(surah.number.inSurah+=1)" class="page-link" href="javascript:void(0)">Next</a>
								</li>
								<li :class="`page-item ${config.current === numberOfVerses ? 'disabled' : ''}`">
									<a @click="lastAyat" class="page-link" href="javascript:void(0)" aria-label="Next">
										<span aria-hidden="true">&raquo;</span>
									</a>
								</li>
							</ul>
						</nav>

						<div class="accordion accordion-flush" id="accordionExample">
							<div class="accordion-item">
								<h5 class="accordion-header" id="headingOne">
									<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
										Tafsir Singkat
									</button>
								</h5>
								<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
									<div class="accordion-body text-start lh-lg">
										{{surah.tafsir.id.short}}
									</div>
								</div>
							</div>
							<div class="accordion-item">
								<h5 class="accordion-header" id="headingTwo">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
										Tafsir Lengkap
									</button>
								</h5>
								<div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
									<div class="accordion-body text-start lh-lg">
										{{surah.tafsir.id.long}}
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {onMounted, reactive, ref} from 'vue'
	import {useRoute} from 'vue-router'
	import axios from 'axios'

	export default{
		setup(){
			onMounted(() => {
				inSurah(num),
				surahDetail(num)
			})

			const route = useRoute()
			let url = process.env.VUE_APP_API_URL
			let num = route.params.num
			let surah = ref({})
			let verses = ref([])
			let numberOfVerses = ref(0)
			let preBismillah = ref(null)
			let config = reactive({
				loading: null,
				hide: false,
				current: 1
			})

			function inSurah(num){
				config.loading = true
				axios
				.get(`${url}quran/${num}`)
				.then(({data}) => {
					preBismillah.value = data.data.preBismillah
					verses.value = data.data.verses
					numberOfVerses.value = data.data.numberOfVerses
					setTimeout(() => {
						config.loading = false
					}, 1500)
				})
				.catch(err => console.error(err.response))
			}

			function surahDetail(num, val){
				config.loading = true
				const ayat = parseInt(localStorage.getItem('active'))
				if(ayat){ 
					val = ayat
					config.current = ayat
				}else{
					val = 1
				}
				
				axios
				.get(`${url}surah/${num}/${val}`)
				.then(({data}) => {
					surah.value = data.data
					setTimeout(() => {
						config.loading = false
					}, 1000)
				})
				.catch(err => console.error(err.response))
			}

			function setActive(val){
				localStorage.setItem('active', val)
			}

			function firstAyat(){
				config.current = 1
				setActive(config.current)
				surahDetail(num, config.current)
			}

			function prevAyat(val){
				setActive(val)
				const ayat = parseInt(localStorage.getItem('active'))
				surahDetail(num, ayat)
			}

			function nextAyat(val){
				if(numberOfVerses.value < val){
					setActive(config.current)
				}else{
					setActive(val)
				}
				// if(preBismillah) preBismillah.value = null
				const ayat = parseInt(localStorage.getItem('active'))
				surahDetail(num, ayat)

			}

			function lastAyat(){
				config.current = numberOfVerses.value
				setActive(config.current)
				surahDetail(num, config.current)
			}

			return {
				surah,
				verses,
				numberOfVerses,
				config,
				preBismillah,
				firstAyat,
				prevAyat,
				nextAyat,
				lastAyat,
				setActive
			}
		}
	}
</script>