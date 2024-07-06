  <script setup>
  const emit = defineEmits(['close']);

  const closeModal = () => {
    emit('close');
  };
</script>

<template>
  <div class="modal-background" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Slot para contenido dinámico -->
      <slot></slot>
      <button class="modal-close" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 500px;
  height: 500px;
  padding: 20px;
  border-radius: 8px;
  background-color: #F2F4FC;
  color: #6B708D;
  background-position: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal-close {
  width: 60px;
  height: 30px;
  color: #6B708D;
  border: 1px solid #6b708d71;
  border-radius: 5px;
}

.modal-close:hover {
  cursor: pointer;
}

@media (max-width:900px) {
  .modal-content {
    width: 400px;
    height: 400px;
    padding: 20px;
    border-radius: 8px;
    background-color: #F2F4FC;
    color: #6B708D;
    background-position: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

}

@media (max-width:400px) {
  .modal-content {
    width: 250px;
    height: 300px;
  }

  .modal-close {
    width: 60px;
    height: 25px;
}
}
</style>