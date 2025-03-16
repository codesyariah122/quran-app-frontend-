<template>
  <div class="mt-5 col-lg-12 col-sm-12">
    <div v-if="config.loading" class="row justify-content-center">
      <div class="col-lg-12 col-sm-12">
        <div
          class="spinner-border text-success"
          role="status"
          style="width: 5rem; height: 5rem"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <div v-else>
      <div v-if="config.change_surah" class="row justify-content-center">
        <div class="col-md-6 col-sm-12 col__surah-card">
          <div class="card">
            <div class="card-body">
              <div
                style="
                  font-family: Avenir, Helvetica, Arial, sans-serif !important;
                "
                class="position-relative"
              >
                <div
                  style="cursor: pointer"
                  class="position-absolute top-0 end-0"
                  @click="$emit('reload-change-surah')"
                >
                  <i class="far fa-lg fa-fw fa-window-close"></i>
                </div>
              </div>
              <h5 class="card-title">
                <span class="circle-number">{{ surah.number }}</span>
                {{ surah.name.short }}
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">
                {{ surah.name.transliteration.id }} -
                {{ surah.name.translation.id }}
              </h6>
              <button
                @click="ToSurah(surah.number)"
                class="btn btn-dark rounded-pill"
              >
                Baca Quran
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="row justify-content-center">
        <div v-if="isPlay" class="col-lg-12">
          <div class="toast show" id="audioToast">
            <div class="toast-header">
              <strong class="me-auto">Memutar Surah</strong>
              <button
                type="button"
                class="btn-close"
                onclick="closeToast()"
              ></button>
            </div>
            <div class="toast-body" id="toastMessage">
              Sedang memutar: Surah <span id="surahName">{{ surahName }}</span>
            </div>
          </div>
        </div>

        <div
          v-if="quranToShow <= lists.length"
          v-for="(surah, index) in quranToShow"
          :key="{ index }"
          class="col-md-4 col-sm-12 mb-3 col__surah-card"
        >
          <div v-if="lists[index]" class="card">
            <div class="card-body">
              <h5 class="card-title">
                <span class="circle-number">{{ lists[index].number }}</span>
                {{ lists[index].name.short }}
              </h5>

              <h6 class="card-subtitle mb-2 text-muted">
                {{ lists[index].name.transliteration.id }} -
                {{ lists[index].name.translation.id }}
              </h6>

              <button
                @click="ToSurah(lists[index].number)"
                class="btn btn-dark rounded-pill btn-sm"
              >
                Baca Quran
              </button>

              <div v-if="lists[index]?.audios && lists[index]?.audios.length">
                <div v-if="lists[index]?.audios && lists[index]?.audios.length">
                  <button
                    v-if="lists[index].isPlaying"
                    @click="pauseAudio(index)"
                    class="btn btn-outline-dark rounded-circle mt-3"
                  >
                    <i class="fa-solid fa-pause fa-lg text-success"></i>
                  </button>
                  <button
                    v-else
                    @click="toggleAudio(index)"
                    class="btn btn-outline-dark rounded-circle mt-3"
                  >
                    <i class="fas fa-play fa-lg text-success"></i>
                  </button>
                </div>
              </div>

              <!-- Single Hidden Audio Player -->
              <audio
                ref="audioPlayer"
                :key="index"
                @ended="playNextAudio(index)"
                :src="currentAudioSrc[index]"
                hidden
              ></audio>
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

        <div
          v-if="quranToShow <= lists.length || lists.length > quranToShow"
          class="col-lg-12 col-sm-12 mt-3 mb-5"
        >
          <div class="d-grid gap-2">
            <button
              @click="ShowMoreSurah"
              class="btn btn-success rounded-pill btn-block"
            >
              <div v-if="config.loading_more">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
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
/**
 * @author Puji Ermanto <pujiermanto@gmail.com>
 * */

export default {
  props: ["lists", "surah", "quranToShow", "config"],

  data() {
    return {
      currentAudioSrc: {},
      currentAudioIndex: {},
      isPlay: false,
      surahName: "",
    };
  },
  methods: {
    ToSurah(val) {
      this.$router.push(`/surah/${val}`);
    },

    ShowMoreSurah() {
      this.$emit("show-more");
    },

    toggleAudio(index) {
      this.lists.forEach((surah, i) => {
        if (i !== index && surah.isPlaying) {
          this.pauseAudio(i);
        }
      });

      if (this.lists[index].isPlaying) {
        this.pauseAudio(index);
      } else {
        this.playAllAudios(index);
      }
    },

    pauseAudio(index) {
      this.isPlay = false;
      this.lists[index].isPlaying = false;
      const audioElement = this.$refs.audioPlayer[index];
      if (audioElement) {
        audioElement.pause();
      }
    },

    playAllAudios(index) {
      this.isPlay = true;
      this.lists[index].isPlaying = true;
      this.currentAudioIndex[index] = 0;
      this.currentAudioSrc[index] = this.lists[index].audios[0];
      const audioElement = this.$refs.audioPlayer[index];
      if (audioElement) {
        this.surahName = this.lists[index].name.transliteration.id;
        // console.log(this.lists[index].number);
        setTimeout(() => {
          audioElement.load();
          audioElement
            .play()
            .then(() => {
              console.log("Memutar audio untuk index:", index);
            })
            .catch(() => {
              console.warn("Autoplay dicegah untuk index:", index, error);
              this.playAudioManually(index);
            });
        }, 300);
      }
    },

    playAudioManually(index) {
      const audioElement = this.$refs.audioPlayer[index];
      if (audioElement) {
        audioElement.play().catch(() => {
          alert("Playback diblokir. Silakan klik untuk memutar.");
        });
      }
    },

    playNextAudio(index) {
      this.currentAudioIndex[index]++;

      if (this.currentAudioIndex[index] < this.lists[index].audios.length) {
        this.currentAudioSrc[index] =
          this.lists[index].audios[this.currentAudioIndex[index]];
        const audioElement = this.$refs.audioPlayer[index];

        if (audioElement) {
          audioElement.load();
          audioElement
            .play()
            .then(() =>
              console.log("Memutar audio berikutnya untuk index:", index)
            )
            .catch((error) => {
              console.warn("Autoplay dicegah untuk audio berikutnya:", error);
              // alert("Klik OK untuk melanjutkan playback manual.");
              this.playAudioManually(index);
            });
        }
      } else {
        // if (index + 1 < this.lists.length) {
        // 	this.playAllAudios(index + 1);
        // } else {
        // 	console.log("Semua audio sudah diputar");
        // }
        console.log("Semua audio sudah selesai diputar, autoplay berhenti.");
        this.isPlay = false;
        setTimeout(() => {
          this.pauseAudio(index);
        }, 500);
      }
    },
  },
};
</script>

<style>
/* Custom styles for the play button */
.btn-primary i {
  color: #fff;
  font-size: 1.2em;
  padding: 0.3em;
}

/* Toast styling */
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  min-width: 250px;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
  z-index: 1000;
}

.toast.show {
  opacity: 1;
  visibility: visible;
}

.toast-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.toast-body {
  margin-top: 5px;
}

/*.btn-close {
	background: none;
	border: none;
	color: #fff;
	font-size: 1.2rem;
	cursor: pointer;
}*/
</style>
