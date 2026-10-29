import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Theme {
    isDark: boolean,
    toggle: () => void
}


export const useThemeStore = create<Theme>()(
    persist(
        (set) => ({
            isDark: false,
            toggle: () => set((state) => ({ isDark: !state.isDark }))
        }),
        { name: 'jobtrack-theme' }
    )
)

