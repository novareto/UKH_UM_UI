<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Users</b-navbar-brand>
      
      <b-collapse is-nav id="nav_collapse">
	<b-navbar-nav v-if="user.authenticated">
	  <b-nav-item>
	    <router-link to="/search">Search</router-link>
	  </b-nav-item>
          <b-nav-item>
	    <router-link to="/list">List</router-link>
	  </b-nav-item>
          <b-nav-item>
	    <router-link to="/Add">Add User</router-link>
	  </b-nav-item>
	  <b-nav-item @click="logout()">
	    <router-link to="/login">Logout</router-link>
	  </b-nav-item>
	</b-navbar-nav>
	<b-navbar-nav v-if="!user.authenticated">
	  <b-nav-item>
	    <router-link to="/login">Login</router-link>
	  </b-nav-item>
	</b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import auth from '../auth'

  export default {
    data() {
      return {
        user: auth.user
      }
    },
    methods: {
      logout() {
        auth.logout()
      }
    }
  }
</script>
