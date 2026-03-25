const updateUIError = function (error) {
  console.error(error);
  const messageEl = document.querySelector('#message') || document.querySelector('form+p');
  if (messageEl) {
    messageEl.innerText = error || 'An error occurred. Please try again.';
    messageEl.style.color = '#c00';
  }
  // Re-enable submit buttons
  document.querySelectorAll('input[type="submit"]').forEach(btn => {
    btn.disabled = false;
    btn.value = btn.dataset.originalValue || btn.value;
  });
  return error;
};

export { updateUIError };
