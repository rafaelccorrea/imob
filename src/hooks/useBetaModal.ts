import { useState, useEffect } from 'react';

const BETA_MODAL_KEY = 'beta-modal-dismissed';

export const useBetaModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Verifica se o modal já foi fechado permanentemente
    const isDismissed = localStorage.getItem(BETA_MODAL_KEY);
    if (!isDismissed) {
      setShowModal(true);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalPermanently = () => {
    localStorage.setItem(BETA_MODAL_KEY, 'true');
    setShowModal(false);
  };

  const resetModal = () => {
    localStorage.removeItem(BETA_MODAL_KEY);
    setShowModal(true);
  };

  return {
    showModal,
    closeModal,
    closeModalPermanently,
    resetModal
  };
};
