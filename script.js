Vue.component("input-field", {
  template: `
    <form action="" class="form" @submit.prevent="addToList">
        <label for="task" class="label">
            Task : *
            <input placeholder="Task ..." type="text" class="text-input" id="task" v-model="task"/>
        </label>
    <button type="submit" class="button" :disabled="task === null || task === ''">To do</button>
  </form>
    `,
  data() {
    return {
        autoIndex: 0,
        task: null
    };
  },
  methods: {
    addToList() {
        const item = { id : this.autoIndex++, content: this.task, isDone: false }
        this.$emit('add-task', item)
        this.task = null
    }
  }
});

Vue.component('task-list', {
    props: {
        taskList: {
            type: Array,
            required: true
        }
    },
    template: ` <ul class="list">
    <li class="list-item" v-for="item in taskList">
      {{item?.content}} 
      <label for="done-box" class="done-box">
            <span v-show="item.isDone">done</span>
            <input type="checkbox" name="done-box" @click="toggleCheack(item.id)" :checked="item.isDone">
            <a class="delete" @click="deleteItem(item.id)">&#10060;</a>
      </label>
    </li>
  </ul>`,
    data() {
        return {
            checked: false
        }
    },
    methods: {
        toggleCheack(id) {
            this.$emit('toggle-done', id)
        },
        deleteItem(id) {
            this.$emit('delete-item', id)
        }
    }
})

let app = new Vue({
  el: "#root",
  data: {
    title: "to do list",
    toDoList: [],
  },
  methods: {
    addToList(elm) {
       this.toDoList.push(elm)
    },
    toggleDone(id) {
        this.toDoList = this.toDoList.map((value) => {
            if (value.id === id)
                value.isDone = !value.isDone
            return value
        })
    },
    deleteItem(id) {
        this.toDoList = this.toDoList.filter((value) => value.id !== id)
        console.log(id);
    }
  }
})
