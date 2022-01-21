import create from 'zustand';

export const useMute = create<{
  isMuted: boolean;
}>((set) => ({
  isMuted: true,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  muteOff: () => set((state) => ({ isMuted: false })),
  MuteOn: () => set((state) => ({ isMuted: true })),
}));
