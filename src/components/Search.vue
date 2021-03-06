
<template>
    <b-container fluid>
    <b-alert variant="success" dismissible :show="5" v-if="message">{{message}}</b-alert>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-button>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- none --</option>
            </b-form-select>
            <b-input-group-button>
              <b-form-select :disabled="!sortBy" v-model="sortDesc">
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Per page" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered"
    >
      <template slot="name" slot-scope="row">
	{{row.item.nname}} {{row.item.vname}}
      </template>
    <template slot="actions" slot-scope="row">
        <b-button size="sm" @click="edit_user(row.item)" class="mr-1">
          Edit
        </b-button>

        <b-button size="sm" @click="delete_user(row.item, row.index, $event.target)" class="mr-1">
          Delete
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import axios from 'axios'
import { API_URL } from '../config'

export default {
    mounted: function() {
	var self = this;
	axios.get(
	      API_URL + '/users/list'
	  ).then(
	      response => {
	          self.items = response.data;
		  self.totalRows = response.data.length;
	      }
	  )
    },
    data () {
	return {
	    items: [],
	    message: "",
	    fields: [
		{ key: 'name', label: 'Full name', sortable: true },
		{ key: 'oid', label: 'User id', sortable: true,
		  'class': 'bold'},
		{ key: 'actions', label: 'Actions', sortable: false}
	    ],
	    currentPage: 1,
	    perPage: 100,
	    totalRows: 0,
	    pageOptions: [ 25, 50, 100, 150 ],
	    sortBy: null,
	    sortDesc: false,
	    filter: null,
	}
    },
    computed: {
	sortOptions () {
	    // Create an options list from our fields
	    return this.fields
		.filter(f => f.sortable)
		.map(f => { return { text: f.label, value: f.key } })
	}
    },
    methods: {
	edit_user(item) {
	    this.$router.push("/edit/" + item.oid)
	},
	delete_user(item, index, button) {

	    console.log('Deleting ', item)	    
	    axios.delete(
		API_URL + '/users/delete/' + item.oid
	    ).then(
		response => {
		    this.items = this.items.filter(
			user => user.oid != item.oid);
		    this.message = "User " + item.oid + " deleted.";
		}
	    )
	},
	onFiltered(filteredItems) {
	    this.totalRows = filteredItems.length
	    this.currentPage = 1
	}
    }
}
</script>
