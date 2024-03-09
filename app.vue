<template>
    <div class="h-screen bg-gradient-to-tr from-black  to-gray-500 overflow-auto relative">
      <div class="flex items-center justify-between bg-white text-white p-4">
        <img width="100" src="/airtribe.jpg" alt="Trello Logo" class="mr-3">
        <h1 class="text-4xl">Trello</h1>
        <button @click="handleSaveChanges" class="btn-save-changes">Save Changes</button>
      </div>
      <div class="container mx-auto px-4">
        <NuxtPage />
      </div>
      
      <div v-if="showToast" class="toast">Changes saved successfully!</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useTrelloStore } from './stores/trello';
  const trelloStore = useTrelloStore();
  
  const showToast = ref(false);
  
  function handleSaveChanges() {
    trelloStore.addArray();
    animateSaveButton();
    showToast.value = true;
    
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }
  
  function animateSaveButton() {
    const button = document.querySelector('.btn-save-changes');
    button.classList.add('saved-animation');
    setTimeout(() => {
      button.classList.remove('saved-animation');
    }, 1500); 
  }
  </script>
  
  <style scoped>
  .btn-save-changes {
    background-color: #37d837;
    border: 2px solid black;
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-save-changes:hover {
    background-color: #2563eb;
  }
  
  .saved-animation {
    animation: savedButtonAnimation 1s ease;
  }
  
  .toast {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4CAF50;
    color: white;
    padding: 16px;
    border-radius: 8px;
    z-index: 999;
    animation: toastAnimation 3s ease;
  }
  
  @keyframes savedButtonAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  @keyframes toastAnimation {
    0% { opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
  }
  </style>
  
