import { defineStore } from 'pinia'
import { fetchPersonnel } from '@/scripts/api.ts'
import type { Personnel } from '@/types/types.ts'

export const usePersonnelStore = defineStore('personnelist', {
  state: () => ({
    list: [] as Personnel[],
    isLoading: true,
  }),
  getters: {
    personnel: (state) => {
      const map = new Map()
      state.list.map( (p) => {
        map.set(p.id, p)
        }
      )
      return map
    }
  },
  actions: {
    async getPersonnel(){
      this.isLoading = true
      const data = await fetchPersonnel()
      this.list = data as Personnel[]
      this.isLoading = false
    },
    getList(arr: string[]){
      const list: Personnel[] = []
      const personnel = this.personnel
      for (const technician of arr){
        if (technician == undefined || technician == 'None' || technician == null) continue;
        if (personnel.has(technician)) list.push(personnel.get(technician))
      }
      return list
    }
  }
})
