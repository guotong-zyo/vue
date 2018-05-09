var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='

/**
 * Actual demo
 */

// var demo = new Vue({
//   el: '#demo',

//   data: {
//     branches: ['master', 'dev'],
//     currentBranch: 'master',
//     commits: null
//   },

//   created: function () {
//     this.fetchData()
//   },

//   watch: {
//     currentBranch: 'fetchData'
//   },

//   filters: {
//     truncate: function (v) {
//       var newline = v.indexOf('\n')
//       return newline > 0 ? v.slice(0, newline) : v
//     },
//     formatDate: function (v) {
//       return v.replace(/T|Z/g, ' ')
//     }
//   },

//   methods: {
//     fetchData: function () {
//       var xhr = new XMLHttpRequest()
//       var self = this
//       xhr.open('GET', apiURL + self.currentBranch)
//       xhr.onload = function () {
//         self.commits = JSON.parse(xhr.responseText)
//         console.log(self.commits[0].html_url)
//       }
//       xhr.send()
//     }
//   }
// })

var Hello = {
  template: `
        <div>
            <p>{{message}}</p>
            <p v-reset></p>
            <p>{{info}}</p>
            <ul>
                <li v-for="item in items">{{item}}</li>
            </ul>
            <button @click="showMsg">Click me to show or close </button>
            <p>{{ showval }}</p>
            <h1 v-if="show"> From parent </h1>
        </div>`,
  name: 'hello',
  created () {
    this.items = ['one', 'two', 'three']
  },
  data () {
    return {
      message: 'vue source from begining to give up',
      items: [],
      showval: '',
      info: 'I will be change my parent'
    }
  },
  computed: {
    show () {
      return this.isshow
    }
  },
  methods: {
    showMsg () {
      this.$emit('showMsg')
    }
  },
  props: ['isshow'],
  directives: {
    reset: {
      bind (el) {
        el.innerHTML = 'I am reseted by this directive:reset'
      }
    }
  },
  watch: {
    show (val, oldval) {
      this.showval = `show's value is ${val}`
    }
  }
}

var App = {
  template: `
    <div id="app">
      <hello :isshow="isshow" @showMsg="changeMsg" ref="hello"/>
      <button @click="changeChild">click me to change your child </button>
    </div>`,
  name: 'app',
  data () {
    return {
      isshow: true
    }
  },
  components: { Hello },
  methods: {
    changeMsg () {
      this.isshow = !this.isshow
    },
    changeChild () {
      this.$refs.hello.info = 'I have been changed by my parent'
    }
  }
}

// var Dome = Vue.extend({
//     template: '<App/>',
//     components: { App }
// })

// var demo = new Dome().$mount('#demo')

var dome = new Vue({
    el: '#demo',
    template: `
        <div id="demo1" key="1" ref="xxx">
            {{1 + 1}} expression
            <p class="ppp" abc="abc"> text node </p>
            <p class="ppp"> {{ 2 + 2}} </p>
            <App/>
        </div>
    `,
    components: {App}
})
