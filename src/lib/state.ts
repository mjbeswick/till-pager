import create from 'zustand';

export const useMute = create<{
  isMuted: boolean;
  toggleMute: () => void;
  muteOn: () => void;
  muteOff: () => void;
}>((set) => ({
  isMuted: true,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  muteOn: () => set((state) => ({ isMuted: true })),
  muteOff: () => set((state) => ({ isMuted: false })),
}));
