import { defineStore } from 'pinia'
import { fetchPersonnel } from '@/scripts/api.ts'
import type { Personnel } from '@/types/types.ts'

export const usePersonnelStore = defineStore('personnelist', {
  state: () => ({
    list: [] as Personnel[],
    isLoading: true,
  }),
  getters: {
    personnelAsMap: (state) => {
      const map = new Map()
      state.list.map( (p) => {
        map.set(p.id, p)
        }
      )
      return map
    },
    personnel: (state) => state.list,
  },
  actions: {
    async getPersonnel(){
      this.isLoading = true
      const data = await fetchPersonnel()
      console.log(data)
      this.list = data as Personnel[]
      this.isLoading = false
    },
    getList(arr: string[]){
      const list: Personnel[] = []
      const personnel = this.personnelAsMap
      for (const technician of arr){
        if (technician == undefined || technician == 'None' || technician == null)
          continue;
        if (personnel.has(technician))
          list.push(personnel.get(technician))
      }
      return list
    },
    getFromMap(map: Map<string, Personnel>){
      const list: Personnel[] = []
      map.forEach((technician) => {
        list.push(technician)
      })
      return list
    },
    getMap(arr: string[]): Map<string, Personnel>{
      // This function should take in the name of personnel and reverse map it to their Personnel Type
      const map: Map<string, Personnel> = new Map()
      const personnel = this.list
      for (const technician of arr){
        personnel.forEach((personnel: Personnel) => {
          if (personnel.fullName == technician) {
            map.set(personnel.id, personnel)
          }
        })
      }
      return map
    },
    getInverseMap(arr: string[]): Map<string, Personnel>{
      const map: Map<string, Personnel> = new Map()
      const personnel = this.list
      for (const technician of arr) {
        personnel.forEach((personnel: Personnel) => {
          if (personnel.fullName == technician) {
            map.set(technician, personnel)
          }
        })
      }
      return map
    },
    getNames(list: string[]): string[]{
      // Get the names from a list of IDs
      if (list.length == 0) return []
      const personnel = this.list
      const returnable: string[] = []
      for (const id of list){
        personnel.forEach((personnel: Personnel) => {
          if(personnel.id == id){
            returnable.push(personnel.fullName)
          }
        })
      }
      return returnable
    },
    getIDs(list: string[]): string[]{
      // Get the IDs from a list of names
      if (list.length == 0) return []
      const personnel = this.list
      const returnable: string[] = []
      for (const name of list) {
        personnel.forEach((personnel: Personnel) => {
          if (personnel.fullName == name) {
            returnable.push(personnel.id)
          }
        })
      }
      return returnable
    }
  }
})
