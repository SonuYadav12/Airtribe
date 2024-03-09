import { defineStore } from 'pinia';
import { collection, query, getDocs, orderBy,  doc, setDoc, Timestamp, updateDoc  } from "firebase/firestore";
import { db } from "../firebase";


export const useTrelloStore = defineStore({
  id: 'trello',
    state: () => {
      return {      
        columns: [],
        columnas: []
      }
  },
  getters: {

  },
  actions: {
    
    async addArray() {
      const docData = { data: this.columns};
      await setDoc(doc(db, "trello", "columns"), docData);
    },
   
    async addItem(title: any) {
    const docRef = await setDoc(doc(db, "trello", "Columns"), 
    {
      title: title,
     
      });
    },
   
    async updateItem() {   
      const columnRef = doc(db, 'columns', '4' );
      await updateDoc(columnRef, 
        { tasks: [ ]
    });
      },
     
    async getItems () {
      const column = query(collection(db, "trello"));
      this.columns = [];
      const queryColumnSnapshot = await getDocs(column);
      queryColumnSnapshot.forEach((doc) => {
        let item = doc.data();
        item.id = doc.id;
        this.columnas.push(item);
        console.log("Columnas: ", this.columnas);
      });  
       
      this.columns = this.columnas[0].data;
      console.log("Columns: ", this.columns);
    },
 
  }
});