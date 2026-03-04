import { defineStore } from 'pinia'
import { fetchPersonnel } from '@/scripts/api.ts'
import type { Personnel } from '@/types/types.ts'

export const usePersonnelStore = defineStore('personnelist', {
  state: () => ({
    list: [] as Personnel[],
    isLoading: false,
  }),
  getters: {
    personnel: (state) => {
      return state.list.map((p) => ({
        id: p.id,
        obj: p
      }))
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
      let list: Personnel[] = []
      const personnel = this.personnel
      for (const technician in arr){

      }
    }
  }
})
