<template>
  <div v-if="isVisible" class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <button class="close-btn" @click="closePopup">✕</button>
      <img :src="popupImage" alt="Product Popup" class="popup-image" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      image: {
        type: String,
      default: require('@/assets/popup/popup1.jpeg')
      }
    },
    data() {
      return {
        isVisible: true,
      };
    },
    computed: {
      popupImage() {
        return this.image;
      }
    },
    methods: {
      closePopup() {
        this.isVisible = false;
      }
    },
  };
</script>

<style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .popup-content {
    position: relative;
    width: 90%;
    max-width: 500px;
    max-height: 100vh;
    animation: fadeIn 0.5s ease;
    overflow: hidden;
  }

  .popup-image {
    width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  }


  .close-btn {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #ff5a5f;
    border: none;
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 50%;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
