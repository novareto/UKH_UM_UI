<template lang="html">
  <div class="col-sm-6 col-sm-offset-3">
      <h1>List users</h1>
      <div class="form-group">
	<input
            type="text"
            class="form-control"
            placeholder="Filter by department"
            v-model="filters.department"
	    />
      </div>
      <button class="btn btn-primary" @click="listUsers()">Search</button>
      <div class="users-area" v-if="users">
        <ul id="userslist">
  	  <li v-for="(user, index) in users">
             <p>{{ user }}</p>
          </li>
        </ul>
      </div>
      <div class="error-area" v-if="error">
        <p>{{ error }}</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
        filters: {
          department: ''
        },
	users: [],
	error: ''
    }
  },
  methods: {
    listUsers() {   
      axios.get(
        'http://localhost:8080/users/list' + (this.filters.department ? ('/' + this.filters.department) : '')
      ).then((response) => {
	    this.error = '';
	    var results = response.data;
	    if (results.length < 1) {
              this.users = [];
	      this.error = "This department doesn't exist."
	    }
	    else {
	      this.users = results;
            }
	  }).catch((err) => {
	  console.log(err);
	  this.users = [];
	  this.error = "This department doesn't exist."
	  })
    }
  }
}
</script>

<style lang="css">
</style>
