document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.emoji-btn, [data-star]');
  const modals = document.querySelectorAll('.modal');

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    const card  = modal?.querySelector('.modal__card');
    if (!modal || !card) return;

    modal.classList.remove('is-closing');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    const closeModal = () => {
      modal.classList.add('is-closing');
      card.offsetHeight;
      requestAnimationFrame(() => modal.classList.remove('is-open'));

      const onEnd = () => {
        modal.classList.remove('is-closing');
        modal.setAttribute('aria-hidden', 'true');
        card.removeEventListener('transitionend', onEnd);
      };
      card.addEventListener('transitionend', onEnd, { once: true });
    };

    modal.addEventListener('click', e => {
      if (e.target.matches('[data-modal-close], .modal__overlay')) closeModal();
    });

    document.addEventListener('keyup', e => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    }, { once: true });
  };

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.modalId || button.dataset.star;
      openModal(targetId);
    });
  });
});
