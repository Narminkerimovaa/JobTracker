import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import type { Application, Status } from '../types/application';

interface ApplicationState {
    applications: Application[],
    addApplication: (app: Omit<Application, 'id'>) => void,
    removeApplication: (id: string) => void,
    updateApplication: (id: string, changes: Partial<Omit<Application, 'id'>>) => void,
    updateStatus: (id: string, status: Status) => void
}


export const useApplicationStore = create<ApplicationState>()(
    persist(
        (set) => ({
            applications: [],
            addApplication: (app) => set((state) => ({ applications: [{ id: crypto.randomUUID(), ...app }, ...state.applications] })),
            removeApplication: (id) => set((state) => ({ applications: state.applications.filter((item) => (item.id !== id)) })),
            updateApplication: (id, changes) => set((state) => ({ applications: state.applications.map((item)=>(item.id==id ? {...item, ...changes} : item))})),
            updateStatus: (id, status)=> set((state)=>({applications: state.applications.map((item)=>item.id===id ? {...item, status: status}: item)}))
        }),
        { name: 'jobtrack-applications' }
    )
)

