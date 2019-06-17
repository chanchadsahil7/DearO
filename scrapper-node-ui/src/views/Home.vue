<template>
<div>
  <div class="text-xs-center">
    <v-btn round color="green" dark @click="scrape()" >Scrape GitHub!</v-btn>
  </div>
  <div class="text">
    <v-flex xs4 sm4>
      <v-text-field
        label="Title"
        single-line
        outline
        v-model="title"
        v-on:keyup.native="getTitle"
      ></v-text-field>
    </v-flex>
    <v-flex xs4 sm4>
      <v-text-field
        label="Description"
        single-line
        outline
        v-model="desc"
        v-on:keyup.native="getDesc"
      ></v-text-field>
    </v-flex>
    <v-flex xs4 sm4>
      <v-text-field
        label="Language"
        single-line
        outline
        v-model="language"
        v-on:keyup.native="getLang"
      ></v-text-field>
    </v-flex>
  </div>
  <div class="tableCon">
    <v-data-table
    :headers="headers"
    :items="rows"
    :rows-per-page-items="rowsPerPageItems"
    :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td class="text-xs-right">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.desc }}</td>
          <td class="text-xs-right">{{ props.item.tag }}</td>
          <td class="text-xs-right">{{ props.item.language }}</td>
        </template>
      </v-data-table>
  </div>
</div>
</template>

<script>
import { http } from './config/http'
export default {
  data () {
    return {
      rowsPerPageItems: [10, 20, 30, 40],
      pagination: {
          rowsPerPage: 20
      },
      title: '',
      desc: '',
      language: '',
      filterUrl: '',
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: true,
          value: 'title'
        },
        { text: 'Description', value: 'desc' },
        { text: 'Tag', value: 'tag' },
        { text: 'Language', value: 'language' },
      ],
      rows: [],
    }
  },

  mounted() {
    http
    .get('getData')
    .then(response => {
        this.rows = response.data;
      })
      .catch(e => {
        console.log(e)
      })
  },

  methods: {
    getTitle() {
      http
      .get(this.filterUrl)
      .then(response => {
          this.rows = response.data;
        })
        .catch(e => {
          console.log(e)
        })
    },

    getDesc() {
      http
      .get(this.filterUrl)
      .then(response => {
          this.rows = response.data;
        })
        .catch(e => {
          console.log(e)
        })
    },

    getLang() {
      http
      .get(this.filterUrl)
      .then(response => {
          this.rows = response.data;
        })
        .catch(e => {
          console.log(e)
        })
    },

    scrape() {
      http
      .get('scrape')
      .then(response => {
          alert('Data Scraped Succesfully')
          http
          .get('getData')
          .then(response => {
              this.rows = response.data;
            })
            .catch(e => {
              console.log(e)
            })
        })
        .catch(e => {
          console.log(e)
        })
    }
  },

  watch: {
    title() {
      this.filterUrl = `search?title=${this.title}`
    },

    desc() {
      this.filterUrl = `search?desc=${this.desc}`
    },

    language() {
      this.filterUrl = `search?language=${this.language}`
    }
  }
}
</script>

<style>
.text {
  margin: 15px;
  display: flex;
  justify-content: space-between;
}

.tableCon {
  margin: 15px;
}
</style>
