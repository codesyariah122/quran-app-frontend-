<template>
  <div>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-lg-12 col-sm-12 flex">
          <small class="text-danger">*Pilih mode baca</small>
          <div class="mode-toggle" @click="modeToggle" :class="darkDark">
            <div class="toggle">
              <div id="dark-mode" type="checkbox"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-5">
        <router-view />
      </div>
    </div>
    <footer class="footer mt-auto py-3 bg-light">
      <div class="container">
        <span class="text-muted">
          Made with <i class="fab fa-gratipay"></i> <br />
          <a
            style="text-decoration: none"
            href="https://github.com/codesyariah122?tab=repositories"
          >
            <i class="fab fa-github"></i>codesyariah122
          </a>
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false,
    };
  },

  mounted() {
    this.loadKoFi();
  },

  methods: {
    loadKoFi() {
      const script = document.createElement("script");
      script.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
      script.async = true;
      script.onload = () => {
        if (window.kofiWidgetOverlay) {
          window.kofiWidgetOverlay.draw("pujiermanto", {
            type: "floating-chat",
            "floating-chat.donateButton.text": "Support Me",
            "floating-chat.donateButton.background-color": "#00b9fe",
            "floating-chat.donateButton.text-color": "#fff",
          });
        }
      };
      document.body.appendChild(script);
    },
    dark() {
      document.querySelector("body").classList.add("dark-mode");
      this.darkMode = true;
    },

    light() {
      document.querySelector("body").classList.remove("dark-mode");
      this.darkMode = false;
    },

    modeToggle() {
      if (
        this.darkMode ||
        document.querySelector("body").classList.contains("dark-mode")
      ) {
        this.light();
      } else {
        this.dark();
      }
    },
  },

  computed: {
    darkDark() {
      return this.darkMode && "darkmode-toggled";
    },
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "quran";
  src: local("quran"),
    url("./assets/quran-font/amiri-quran-colored.woff") format("truetype");
}

@font-face {
  font-family: "AlQalam";
  src: local("AlQalam"),
    url("./assets/quran-font/noorehidayat.ttf") format("opentype");
}
@import "./scss/_main.scss";
</style>
