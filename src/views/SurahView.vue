<template>
  <div class="surah__detail">
    <div class="col-lg-12 col-sm-12">
      <div class="d-grid gap-2">
        <button
          @click="$router.push({ path: '/' }), setActive(1)"
          class="btn btn-back btn-sm rounded-pill circle"
        >
          <i class="fas fa-lg fa-fw fa-arrow-left"></i> Back
        </button>
      </div>
    </div>
    <div class="card mt-4">
      <div class="card-body">
        <div
          v-if="config.loading"
          class="mt-3 mb -3 d-flex justify-content-center"
        >
          <div
            class="spinner-border text-success"
            role="status"
            style="width: 5rem; height: 5rem"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else>
          <div
            v-if="preBismillah && config.current === 1"
            class="row justify-content-center"
          >
            <div class="col-lg-12 col-sm-12">
              <h2>
                {{ preBismillah.text.arab }}
              </h2>
              <span>
                {{ preBismillah.text.transliteration.en }}
              </span>
              <blockquote class="mt-2 blockquote-footer">
                {{ preBismillah.translation.id }}
              </blockquote>
              <!-- <audio class="mt-2" ref="player" controls>
								<source v-bind:src="preBismillah.audio.primary" type="audio/mp3"/>
							</audio> -->
            </div>
          </div>

          <div v-if="surah" class="row justify-content-center mt-5">
            <div v-if="surah.text" class="col-lg-12 col-sm-12 card-title">
              <!-- <small v-if="!newPlayer" class="text-danger">*Player baru tersedia</small>
							<div class="d-flex justify-content-center mb-5">
								<div class="d-grid gap-2">
									<button v-if="!newPlayer" @click="newPlayerShow" class="btn btn-primary" type="button">Ganti Player Baru <i class="fa-solid fa-paint-roller"></i></button>
									<button v-if="newPlayer" @click="changeOldPlayer" class="btn btn-outline-success" type="button"><i class="fa-solid fa-eraser"></i> Ganti Ke Player Lama</button>
								</div>
							</div> -->
              <!-- <div v-if="!newPlayer">
								<h2>
									<span class="circle-number">
										{{surah?.number?.inSurah}}
									</span> {{surah?.text?.arab}} 
								</h2>
								<h6 class="mt-3">
									{{surah?.text?.transliteration?.en}}
								</h6>
								<blockquote class="mb-5 text-small">
									{{surah?.translation?.id}}
								</blockquote>
								<div class="audio-player mt-4">
									<div class="audio-info">
										<span class="audio-title">{{ surah.name }}</span>
										<span class="audio-author">{{ surah.verse_number }}</span>
									</div>
									<audio ref="player" controls>
										<source :src="surah.audio.primary" type="audio/mp3" />
									</audio>
								</div>
							</div> -->

              <div id="player02" class="player horizontal">
                <div class="wrapper">
                  <div class="info-wrapper">
                    <!-- <img :src="require('@/assets/logo.png')" alt="LogoMusicImage"> -->
                    <div class="info">
                      <h2>
                        <span class="circle-number">
                          {{ surah.number.inSurah }}
                        </span>
                        {{ surah.text.arab }}
                      </h2>
                      <h6 class="mt-3">
                        {{ surah?.text?.transliteration?.en }}
                      </h6>
                      <blockquote class="mb-5 text-small">
                        {{ surah?.translation?.id }}
                      </blockquote>
                    </div>
                  </div>

                  <div class="controls text-white">
                    <div
                      class="prev"
                      @click="prevAyat((surah.number.inSurah -= 1))"
                    >
                      <i class="fa-solid fa-backward fa-lg"></i>
                    </div>
                    <div class="play" v-if="isPlaying" @click="togglePlayPause">
                      <i class="fa-solid fa-pause fa-lg"></i>
                    </div>
                    <div v-else class="play" @click="togglePlayPause">
                      <i class="fa-solid fa-play fa-lg"></i>
                    </div>
                    <div
                      class="next"
                      @click="nextAyat((surah.number.inSurah += 1))"
                    >
                      <i class="fa-solid fa-forward fa-lg"></i>
                    </div>
                  </div>

                  <div class="track-time">
                    <div class="track" id="track-progress">
                      <div
                        class="track-filled"
                        id="track-filled"
                        :style="{ width: trackProgress + '%' }"
                      ></div>
                    </div>
                    <div class="time">
                      <div id="current-time">{{ currentTime }}</div>
                      <div id="total-time">{{ totalTime }}</div>
                    </div>
                  </div>
                </div>
                <!-- <small v-if="newPlayer" class="text-info" style="margin-top: 5rem; color: #ffe;">*Player ini sedang masa pengembangan<br/> namun masih bisa digunakan untuk memutar audio ...</small> -->
              </div>

              <audio
                ref="audioPlayer"
                :src="surah.audio.primary"
                @timeupdate="updateProgress"
                @loadedmetadata="loadMetadata"
              ></audio>
            </div>

            <div class="col-lg-8 col-sm-12 mt-5 col__option-surah-view">
              <div class="alert alert-success" role="alert">
                Pilih opsi filter ayat, untuk pindah ke ayat tertentu..
              </div>

              <select
                v-if="config.loading"
                class="form-select"
                aria-label="Default select example"
              >
                <option>
                  <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </option>
              </select>

              <select
                v-else
                class="form-select"
                aria-label="Default select example"
                @change="changeSurah($event)"
                v-model="config.selected"
              >
                <option disabled value="">Filter Ayat</option>
                <option
                  v-for="(item, index) in listsSelect"
                  :value="item.number.inSurah"
                  :key="index + 1"
                >
                  Ayat - {{ item.number.inSurah }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div v-if="surah" class="row justify-content-center mt-2">
          <div v-if="surah.text" class="col-lg-12 col-sm-12 card-title">
            <nav aria-label="Page navigation example mt-2">
              <ul class="pagination justify-content-center">
                <li
                  :class="`page-item ${config.current === 1 ? 'disabled' : ''}`"
                >
                  <a
                    @click="firstAyat"
                    class="page-link"
                    href="javascript:void(0)"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li
                  :class="`page-item ${config.current === 1 ? 'disabled' : ''}`"
                >
                  <a
                    @click="prevAyat((surah.number.inSurah -= 1))"
                    class="page-link"
                    href="javascript:void(0)"
                    tabindex="-1"
                    aria-disabled="true"
                    >Previous</a
                  >
                </li>

                <li
                  :class="`page-item ${
                    config.current == numberOfVerses ? 'disabled' : ''
                  }`"
                >
                  <a
                    @click="nextAyat((surah.number.inSurah += 1))"
                    class="page-link"
                    href="javascript:void(0)"
                    >Next</a
                  >
                </li>
                <li
                  :class="`page-item ${
                    config.current === numberOfVerses ? 'disabled' : ''
                  }`"
                >
                  <a
                    @click="lastAyat"
                    class="page-link"
                    href="javascript:void(0)"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>

            <div class="accordion accordion-flush" id="accordionExample">
              <div class="accordion-item">
                <h5 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Tafsir Singkat
                  </button>
                </h5>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div
                    v-if="config.loading"
                    class="d-flex justify-content-center"
                  >
                    <div
                      class="mt-2 mb-2 spinner-grow text-success"
                      role="status"
                      style="width: 2rem; height: 2rem"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div v-else class="accordion-body text-start lh-lg">
                    {{ surah.tafsir.id.short }}
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h5 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Tafsir Lengkap
                  </button>
                </h5>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div
                    v-if="config.loading"
                    class="d-flex justify-content-center"
                  >
                    <div
                      class="mt-2 mb-2 spinner-grow text-success"
                      role="status"
                      style="width: 2rem; height: 2rem"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div v-else class="accordion-body text-start lh-lg">
                    {{ surah.tafsir.id.long }}
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
/**
 * @author Puji Ermanto <pujiermanto@gmail.com>
 * */

import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    onMounted(() => {
      inSurah(num), surahDetail(num), loadMetadata();
    });

    const route = useRoute();
    let url = process.env.VUE_APP_API_URL;
    let num = route.params.num;
    let listsSelect = ref([]);
    let surah = ref({});
    let verses = ref([]);
    let numberOfVerses = ref(0);
    let preBismillah = ref(null);
    let config = reactive({
      loading: null,
      hide: false,
      current: 1,
      selected: "",
      default: true,
    });
    let audioPlayer = ref(null);
    let currentTime = ref("00:00");
    let totalTime = ref("00:00");
    let trackProgress = ref(0);
    let isPlaying = ref(false);
    let newPlayer = ref(false);

    function newPlayerShow() {
      newPlayer.value = true;
    }

    function changeOldPlayer() {
      newPlayer.value = false;
    }

    const loadMetadata = () => {
      if (audioPlayer.value) {
        const duration = audioPlayer.value.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60)
          .toString()
          .padStart(2, "0");
        totalTime.value = `${minutes}:${seconds}`;
        updateProgress(duration);
      }
    };

    const togglePlayPause = () => {
      if (audioPlayer.value) {
        if (audioPlayer.value.paused) {
          audioPlayer.value.play();
          isPlaying.value = true;
          loadMetadata();
        } else {
          audioPlayer.value.pause();
          isPlaying.value = false;
        }
      }
    };

    const updateProgress = (duration) => {
      if (audioPlayer.value) {
        const current = audioPlayer.value.currentTime;
        const duration = audioPlayer.value.duration;
        const minutes = Math.floor(current / 60);
        const seconds = Math.floor(current % 60)
          .toString()
          .padStart(2, "0");
        currentTime.value = `${minutes}:${seconds}`;
        trackProgress.value = (current / duration) * 100;

        if (totalTime.value == currentTime.value) {
          isPlaying.value = false;
        }
      }
    };

    function inSurah(num) {
      config.loading = true;
      axios
        .get(`${url}quran/${num}`)
        .then(({ data }) => {
          preBismillah.value = data.data.preBismillah;
          verses.value = data.data.verses;
          numberOfVerses.value = data.data.numberOfVerses;
          listsSelect.value = data.data.verses;
          setTimeout(() => {
            config.loading = false;
          }, 500);
        })
        .catch((err) => console.error(err.response));
    }

    function surahDetail(num, val) {
      config.loading = true;
      const ayat = parseInt(localStorage.getItem("active"));
      if (ayat) {
        val = ayat;
        config.current = ayat;
      } else {
        val = 1;
      }

      axios
        .get(`${url}surah/${num}/${val}`)
        .then(({ data }) => {
          surah.value = data.data;
          setTimeout(() => {
            config.loading = false;
          }, 1500);
        })
        .catch((err) => console.error(err.response));
    }

    function changeSurah(e) {
      config.selected = e.target.value ? e.target.value : "Filter Surah";
      config.default = false;
      setActive(config.selected);
      surahDetail(num, config.selected);
    }

    function setActive(val) {
      localStorage.setItem("active", val);
    }

    function firstAyat() {
      config.current = 1;
      setActive(config.current);
      surahDetail(num, config.current);
    }

    function prevAyat(val) {
      setActive(val);
      const ayat = parseInt(localStorage.getItem("active"));
      surahDetail(num, ayat);
    }

    function nextAyat(val) {
      if (numberOfVerses.value < val) {
        setActive(config.current);
      } else {
        setActive(val);
      }
      const ayat = parseInt(localStorage.getItem("active"));
      surahDetail(num, ayat);
    }

    function lastAyat() {
      config.current = numberOfVerses.value;
      setActive(config.current);
      surahDetail(num, config.current);
    }

    return {
      surah,
      verses,
      listsSelect,
      numberOfVerses,
      config,
      preBismillah,
      firstAyat,
      prevAyat,
      nextAyat,
      lastAyat,
      setActive,
      changeSurah,
      audioPlayer,
      currentTime,
      totalTime,
      trackProgress,
      togglePlayPause,
      updateProgress,
      loadMetadata,
      isPlaying,
      newPlayer,
      newPlayerShow,
      changeOldPlayer,
    };
  },
};
</script>

<style lang="css">
#boxes * {
  border: 1px solid transparent;
}

#boxes {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-template-areas:
    "A B"
    "A C";
  gap: 32px;
  place-content: center;
  height: 100vh;
  width: 100%;
}

#player02 {
  grid-area: B;
  height: fit-content;
}

#player02 .controls {
  display: flex;
  justify-content: space-around;
}

.play,
.prev,
.next {
  cursor: pointer;
}

.player {
  background-color: rgba(0, 14, 0, 0.9);
  background-image: url("@/assets/pattern-corner2.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 170px;
  border-radius: 20px;
}

.player img {
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: 10px;
}

.info {
  color: #e1e1e6;
}

.info {
  opacity: 0.9;
  font-size: 19px;
}

.wrapper {
  width: 90%;
  margin-left: 3rem;
}

.info-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.player h1 {
  font-size: 2.3rem;
  color: #e1e1e6;
  padding-bottom: 7px;
}

.info .circle-number {
  background: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem !important;
  border-radius: 0.8em;
  -moz-border-radius: 0.8em;
  -webkit-border-radius: 0.8em;
  color: #000;
  font-weight: 600;
  display: inline-block;
  font-weight: bold;
  line-height: 1.5em;
  margin-right: 5px;
  text-align: center;
  width: 1.6em;
  font-family: "AlQalam";
}

.controls {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}

.track {
  padding-top: 28px;
  position: relative;
}

/*.track::before {
		content: '';
		height: 6px;
		width: 100%;
		display: block;
		background: #D9D9D9;
		opacity: 0.3;
		border-radius: 10px;
		position: absolute;
	}*/

.track::after {
  content: "";
  height: 6px;
  width: 100%;
  display: block;
  background: rgba(76, 175, 80, 0.2);
  border-radius: 10px;
  top: 25px;
}
.track-filled {
  height: 20px;
  background-color: #4caf50;
  border-radius: 10px;
}

.time {
  opacity: 1;
  font-size: 16px;
  font-weight: 500;
  color: gainsboro;

  display: flex;
  justify-content: space-between;
  padding-top: 9.6px;
}

@media (max-width: 670px) {
  #boxes {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    margin: auto;
    height: auto;
    padding-block: 60px;
  }

  .wrapper {
    width: 100%;
    margin-left: 0;
  }

  .player {
    background-color: rgba(0, 14, 0, 0.9);
    background-image: url("@/assets/quran-pattern.png");
    background-position: bottom center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
